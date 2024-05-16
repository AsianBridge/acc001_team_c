#ビンゴ関連の関数

import json
import boto3
import uuid
import random
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.conditions import Attr
from decimal import Decimal
from datetime import datetime
import time

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')

def get_mybingo(event, context):
   user_id = event['userId']
   
   json_data = set_bingo_info_json()
   
   # BINGOSTATEテーブルを検索
   bingo_state_table = dynamodb.Table('BINGOSTATE2')
   response = bingo_state_table.query(
       KeyConditionExpression=Key('user_id').eq(user_id)
   ) 

   items = response['Items']
   
   # flagが0のitemがない場合は新しいBINGOを作成
   if not any(item['flag'] == 0 for item in response['Items']):
       bingo_items = bingo_state_table.scan()['Items']
       bingo_id = random.sample(bingo_items, 1)
       bingo_id = int(bingo_id[0]['bingo_id'])
       body = {
           'user_id': user_id,
           'bingo_id': bingo_id,
           'flag': 0
       }
     
       new_bingo = bingo_state_table.put_item(
           Item=body
       )
       json_data = set_bingo_info_json()
       json_data = get_store_name(bingo_id, json_data)
       json_data = info_json_add(json_data, body)
       
       reslut = {
            'statusCode': 200,
            'body': json_data
       }
       return reslut
       
   mybingo = [item for item in items if item.get('flag') == 0]
   
   bingo_id = int(mybingo[0]['bingo_id'])
   
   json_data = get_store_name(bingo_id, json_data)
   
   a = info_json_add(json_data, mybingo[0]) 
   
   result = {
            'statusCode': 200,
            'body': json.dumps(a)
   }
   return result
   
def post_mybingo(event, context):
    # use the DynamoDB object to select our table
    table = dynamodb.Table('BINGOSTATE2')
    user_id = event['userId']
    bingo_id = int(event['bingoId'])

    response = table.query(
        KeyConditionExpression=Key('user_id').eq(user_id) & Key('bingo_id').eq(bingo_id)
    )
    
    if not response['Items'] or (response['Items'][0]['flag'] != 0 and response['Items'][0]['flag'] != 4):
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }
        
    item = response['Items'][0]
    item['flag'] = 3
    item['posted_time'] = datetime.now().isoformat()
    table.put_item(Item=item)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }
    
def get_bingo(event, context):
    # BINGOテーブルを検索
    table = dynamodb.Table('BINGOSTATE2')
    user_id = event['userId']
    number = 15;#取得するビンゴの数
    
    response = table.query(
        IndexName='flag-index',
        KeyConditionExpression='flag = :flag',
        FilterExpression='user_id <> :user_id',
        ExpressionAttributeValues={
            ':flag': 3,
            ':user_id': user_id
        }
    )

    items = response['Items']
    
    if not items:
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }
    
    items = [item for item in items if item['user_id'] != user_id]

    selected_items = random.sample(items, min(len(items), number))

    results = [""] * number
    
    j = 0
    for i in selected_items:
        results[j] = set_bingo_info_json()
        results[j] = get_store_name(int(i['bingo_id']), results[j])
        if results[j] == -1:
            return {
                'statusCode': 404,
                'body': json.dumps('No store or bingo')
            }
            
        results[j] = info_json_add(results[j], i)
        j = j + 1 
    print('OK4')
    
    result = {
        'statusCode': 200,
        'body': results
    }
    
    return result

def post_keep(event, context):
    table = dynamodb.Table('BINGOSTATE2')
    user_id = event['userId']
    bingo_id = int(event['bingoId'])
    contributor_id = event['contributorId']

    response = table.query(
        KeyConditionExpression=Key('user_id').eq(contributor_id) & Key('bingo_id').eq(bingo_id)
    )
    
    if not response['Items'] or response['Items'][0]['flag'] != 3:
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }
        
    response2 = table.query(
        KeyConditionExpression=Key('user_id').eq(user_id + '-s') & Key('bingo_id').eq(bingo_id)
    )
    
    if response2['Items']:
        for i in response2['Items']:
            if i['flag'] == 1:
                return {
                    'statusCode': 409,
                    'body': json.dumps('Already kept')
                }
        
    item = response['Items'][0]
    if 'done_time' in item:
        item['done_time'] = None
    if 'done_time' in item:
        item['posted_time'] = None
    item['user_id'] = user_id + '-s'
    item['flag'] = 1
    
    table.put_item(Item=item)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }
    
def post_good(event, context):
    # use the DynamoDB object to select our table
    table = dynamodb.Table('BINGO')

    response = table.query(
        KeyConditionExpression=Key('bingo_id').eq(int(event['bingoId']))
    )
    
    if not response['Items']:
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }
        
    item = response['Items'][0]
    item['good_number'] = int(item['good_number']) + int(event['good_number'])
    table.put_item(Item=item)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }
    
def get_maked_bingo(event, context):
    user_id = event['userId']
    
    json_data = set_bingo_info_json()
   
    # BINGOSTATEテーブルを検索
    bingo_state_table = dynamodb.Table('BINGOSTATE2')
    response = bingo_state_table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )

    items = response['Items']
    
    maked_bingos = [item for item in items if item.get('flag') == 2]
    if not maked_bingos:
        return {
            'statusCode': 404,
            'body': json.dumps('No Bingo')
        }
    
    a = [json_data.copy() for _ in range(len(maked_bingos))]

    for i in range(len(maked_bingos)):
        bingo_id = int(maked_bingos[i]['bingo_id'])
        a[i] = get_store_name(bingo_id, a[i])
        a[i] = info_json_add(a[i], maked_bingos[i])
    
    result = [""]* len(maked_bingos)
    for i in range(len(maked_bingos)):
        result[i] = {
            'statusCode': 200,
            'body': json.dumps(a[i])
        }
    return result
    
def get_done_bingo(event, context):
    user_id = event['userId']
    
    json_data = set_bingo_info_json()
    
    # BINGOSTATEテーブルを検索
    bingo_state_table = dynamodb.Table('BINGOSTATE2')
    response = bingo_state_table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )

    items = response['Items']
    
    done_bingos = [item for item in items if item.get('done_time')]
    if not done_bingos:
        return {
            'statusCode': 404,
            'body': json.dumps('No Bingo')
        }
    
    a = [json_data.copy() for _ in range(len(done_bingos))]

    for i in range(len(done_bingos)):
        bingo_id = int(done_bingos[i]['bingo_id'])
        a[i] = get_store_name(bingo_id, a[i])
        a[i] = info_json_add(a[i], done_bingos[i])
    
    result = [""]* len(done_bingos)
    for i in range(len(done_bingos)):
        result[i] = {
            'statusCode': 200,
            'body': json.dumps(a[i])
        }
    return result

def get_keep_bingo(event, context):
    user_id = event['userId'] + '-s'
    
    json_data = set_bingo_info_json()
   
    # BINGOSTATEテーブルを検索
    bingo_state_table = dynamodb.Table('BINGOSTATE2')
    response = bingo_state_table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )

    items = response['Items']
    keep_bingos = [item for item in items if item.get('flag') == 1]
    
    if not keep_bingos:
        return {
            'statusCode': 404,
            'body': json.dumps('No Bingo')
        }
    # flagが2のitemを返す
    
    a = [json_data.copy() for _ in range(len(keep_bingos))]
    
    for i in range(len(keep_bingos)):
        bingo_id = int(keep_bingos[i]['bingo_id'])
        a[i] = get_store_name(bingo_id, a[i])
        a[i] = info_json_add(a[i], keep_bingos[i])

    result = [""]* len(keep_bingos)
    for i in range(len(keep_bingos)):
        result[i] = {
            'statusCode': 200,
            'body': json.dumps(a[i])
        }
    return result
    
def post_bingo(event, context):
    table = dynamodb.Table('BINGO')
    
    response = table.scan(
        FilterExpression=Attr('maker_id').eq(event['makerId'])
    )
    
    if response['Items']:
        for i in response['Items']:
            for j in range(1, 10):
                event_name = 'storeId_' + str(j)
                item_name = 'store_id_' + str(j)
                if i[item_name] != event[event_name]:
                    break
                if j == 9:
                    return {
                        'statusCode': 409,
                        'body': json.dumps('Already posted')
                    }
    
    now = datetime.now()
    bingo_id = now.strftime('%Y%m%d%H%M%S%f') 
    bingo_id = int(bingo_id[2:-2])
    
    new_bingo = table.put_item(
           Item={
                'bingo_id': bingo_id,
                'maker_id': event['makerId'],
                'good_number': 0,
                'store_id_1': event['storeId_1'],
                'store_id_2': event['storeId_2'],
                'store_id_3': event['storeId_3'],
                'store_id_4': event['storeId_4'],
                'store_id_5': event['storeId_5'],
                'store_id_6': event['storeId_6'],
                'store_id_7': event['storeId_7'],
                'store_id_8': event['storeId_8'],
                'store_id_9': event['storeId_9']
           }
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }
    
def post_play(event, context):
    table = dynamodb.Table('BINGOSTATE2')
    user_id = event['userId']
    bingo_id = int(event['bingoId'])
    contributor_id = event['contributorId']

    response = table.query(
        KeyConditionExpression=Key('user_id').eq(contributor_id) & Key('bingo_id').eq(bingo_id)
    )
    
    if not response['Items'] or response['Items'][0]['flag'] != 3:
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }
    
    response = table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )
    
    if response['Items']:
        for i in response['Items']:
            if i['flag'] == 0:
                #プレイ中のビンゴが既にあったら削除する
                delete_response = table.delete_item(
                    Key={
                        'user_id': i['user_id'],
                        'bingo_id': i['bingo_id']  # ソートキーも指定
                    }
                )
    
    response = table.put_item(
        Item={
            'user_id': user_id,
            'bingo_id': bingo_id,
            'flag': 0
            })
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }
    
def get_good(event, context):
    bingo_id = int(event['bingoId'])
    table = dynamodb.Table('BINGO')
    
    response = table.query(
        KeyConditionExpression=Key('bingo_id').eq(bingo_id)
    )
    
    if not response['Items']:
        return {
            'statusCode': 404,
            'body': json.dumps('No Bingo')
        }
        
    return {
        'statusCode': 200,
        'body': int(response['Items'][0]['good_number'])
    }

def set_bingo_info_json():
    x = {
        'user_id': None,
        'bingo_id': None,
        'flag': None,
        'pi_1': None,
        'pi_2': None,
        'pi_3': None,
        'pi_4': None,
        'pi_5': None,
        'pi_6': None,
        'pi_7': None,
        'pi_8': None,
        'pi_9': None,
        'store_name_1': None,
        'store_name_2': None,
        'store_name_3': None,
        'store_name_4': None,
        'store_name_5': None,
        'store_name_6': None,
        'store_name_7': None,
        'store_name_8': None,
        'store_name_9': None
    }
    
    return x
    
def get_store_name(bingo_id, json_data):
    print(bingo_id)
    table = dynamodb.Table('BINGO')
    
    response = table.query(
        KeyConditionExpression=Key('bingo_id').eq(bingo_id)
    )

    
    if not response['Items']:
        return -1
    store_ids = [int(response['Items'][0]['store_id_' + str(i)]) for i in range(1, 10)]
    print(store_ids)
        
    # リクエスト用のキーを作成
    keys_to_get = [{'id': store_id} for store_id in store_ids] 
    
    print("Keys to Get:", keys_to_get)
    # 一括取得
    response = dynamodb.batch_get_item(
        RequestItems={
            'STORE': {
                'Keys': keys_to_get
            }
        }
    )
    print(response)
    if 'Responses' not in response or 'STORE' not in response['Responses']:
        return -1
        
    store_info = {str(item['id']): item for item in response['Responses']['STORE']}

    # 取得した店舗IDに基づいて json_data に店舗名を設定
    for i in range(1, 10):
        store_id = str(store_ids[i - 1])
        name_key = "store_name_" + str(i)
        store_data = store_info.get(str(store_id))
        if store_data:
            json_data[name_key] = store_data['name']
        else:
            json_data[name_key] = "Store name not found"
    return json_data
    
def info_json_add(a, done_bingos):
    done_bingos_body = {k: float(v) if isinstance(v, Decimal) else v for k, v in done_bingos.items()}
    if 'user_id' in done_bingos_body:
        a['user_id'] = done_bingos_body['user_id']
    if 'bingo_id' in done_bingos_body:
        a['bingo_id'] = done_bingos_body['bingo_id']
    if 'flag' in done_bingos_body:
        a['flag'] = done_bingos_body['flag']
    
    for i in range(1, 10):
        name = "pi_" + str(i)
        if name in done_bingos_body:
            a[name] = done_bingos_body[name]
    
    return a
