import json
import boto3
import uuid
import random
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.conditions import Attr
from decimal import Decimal
from datetime import datetime
import base64
import time



# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')

# create an S3 object using the AWS SDK
s3 = boto3.client('s3')
BUCKET_NAME = 'acc001-team-c-image-bucket'  # S3バケット名

def lambda_handler(event, context):
    print('event  ' + str(event))
    # API Gatewayからのリクエストを処理するメインの関数
    http_method = event["httpMethod"]
    
    if http_method == "GET_AC":
        #アカウント情報を登録
        return get_account(event, context)
    elif http_method == "POST_AC":
        #アカウント情報を取得
        return post_account(event, context)
    elif http_method == "GET_MYBINGO":
        #自分のビンゴ情報を取得
        return get_mybingo(event, context)
    elif http_method == "POST_REVIEW":
        #お店のレビューを登録
        return post_review(event, context)
    elif http_method == "POST_MYBINGO":
        #他の人が見れるようにする(公開する)
        return post_mybingo(event, context)
    elif http_method == "GET_BINGO":
        #ランダムにビンゴ(詳細な情報も)を取得
        return get_bingo(event, context)
    elif http_method == "POST_IMAGE":
        #食べ物の画像を登録
        return post_image(event, context)
    elif http_method == "POST_KEEP":
        #ビンゴを保存する
        return post_keep(event, context)
    elif http_method == "POST_GOOD":
        #いいねする
        return post_good(event, context)
    elif http_method == "GET_MAKED_BINGO":
        #自分が作成したビンゴを取得
        return get_maked_bingo(event, context)
    elif http_method == "GET_DONE_BINGO":
        #自分が達成したビンゴを取得
        return get_done_bingo(event, context)
    elif http_method == "GET_KEEP_BINGO":
        #自分が保存したビンゴを取得
        return get_keep_bingo(event, context)
    elif http_method == "CONFIRMATION_ID":
        #idが使えるか(重複していないか)確認
        return confirmation_id(event, context)
    elif http_method == "GET_STORE":
        #お店の情報を取得
        return get_store(event, context)
    elif http_method == "POST_BINGO":
        #作ったビンゴを登録
        return post_bingo(event, context)
    elif http_method == "GET_STORE_ID":
        #お店のidを取得
        return get_store_id(event, context)
    elif http_method == "UPDATE_AC":
        #アカウント情報を更新
        return update_acount(event, context)
    elif http_method == "GET_REVIEW":
        #レビューを取得
        return get_review(event, context)
    elif http_method == "POST_STORE":
        #お店を登録
        return post_store(event, context)
    elif http_method == "GET_DONE_BINGO_NUMBER":
        #達成したビンゴの数を取得
        return get_done_bingo_number(event, context)
    elif http_method == "GET_POSTED_BINGO_NUMBER":
        #投稿されたビンゴの数を取得
        return get_posted_bingo_number(event, context)
    elif http_method == "SEARCH_AC":
        #アカウントを検索する
        return search_account(event, context)
    elif http_method == "DELETE_AC":
        #アカウントを削除する
        return delete_account(event, context)
    elif http_method == "GET_ALL_NUMBER":
        #色々な総数を取得
        return get_all_number(event, context)
    elif http_method == "SEARCH_STORE":
        #お店を検索
        return search_store(event, context)
    elif http_method == "UPDATE_STORE":
        #お店を検索
        return update_store(event, context)
    else:
        return {
            "statusCode": 405,
            "body": json.dumps("Method not allowed")
        }

def post_account(event, context):
    # use the DynamoDB object to select our table
    table = dynamodb.Table('ACCOUNT')
    
    response = table.put_item(
        Item={
            'birthday_day': event['birthday_day'],
            'birthday_month': event['birthday_month'],
            'birthday_year': event['birthday_year'],
            'mail_address': event['mail_address'],
            'password': event['password'],
            'residence': event['residence'],
            'user_id': event['userId']
            })
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }

def get_account(event, context):
    
    user_id = event['userId']
   
    # BINGOSTATEテーブルを検索
    bingo_state_table = dynamodb.Table('ACCOUNT')
    response = bingo_state_table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )

    items = response['Items']
   
    if not response['Items']:
        return {
            'statusCode': 404,
            'body': json.dumps('No Acount')
        }
    # アカウント情報を返す
    # Decimalをfloatに変換してからレスポンスを返す
    active_bingo_float = {k: convert_decimal_to_float(v) for k, v in response['Items'][0].items()}
    return {
        'statusCode': 200,
        'body': active_bingo_float
    }

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
   

def post_review(event, context):
    user_id = event['userId']
    bingo_id = int(event['bingoId'])
    star_taste = event['starTaste']
    star_atmosphere = event['starAtmosphere']
    star_cp = event['starCP']
    store_number = event['store_number']
    
    if not (store_number == '1' or store_number == '2' or store_number == '3' or store_number == '4' or store_number == '5' or store_number == '6' or store_number == '7' or store_number == '8' or store_number == '9'):
        return {
            'statusCode': 400,
            'body': json.dumps('Incorrect store_number')
        }

    # BINGOSTATEテーブルを取得
    bingo_state_table = dynamodb.Table('BINGOSTATE2')

    # ユーザーIDとビンゴIDで検索
    response = bingo_state_table.query(
        KeyConditionExpression=Key('user_id').eq(user_id) & Key('bingo_id').eq(bingo_id)
    )

    # アイテムが存在しない場合はエラー
    if not response['Items']:
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }

    item = response['Items'][0]
    
    if 'star_taste_' + store_number in item :
        #すでにレビューが登録されている場合
        return {
            'statusCode': 409,
            'body': json.dumps('Already sent')
        }

    # レビュー情報を更新
    if 'caption' in event:
        item['review_' + store_number] = event['caption']
    item['star_taste_' + store_number] = star_taste
    item['star_atmosphere_' + store_number] = star_atmosphere
    item['star_cp_' + store_number] = star_cp

    #ビンゴが達成されたか判断
    if not 'done_time' in item:
        store = []
        store.append(store_number)
        for i in range(1, 10):
            if 'star_taste_' + str(i) in item :
                store.append(i)
        
        if ((1 in store and 2 in store and 3 in store) or 
           (4 in store and 5 in store and 6 in store) or
           (7 in store and 8 in store and 9 in store) or
           (1 in store and 4 in store and 7 in store) or
           (2 in store and 5 in store and 8 in store) or
           (3 in store and 6 in store and 9 in store) or
           (1 in store and 5 in store and 9 in store) or
           (3 in store and 5 in store and 7 in store)):
               item['done_time'] = datetime.now().isoformat()
               
    # アイテムを更新
    bingo_state_table.put_item(Item=item)
               

    return {
        'statusCode': 200,
        'body': json.dumps('Review posted successfully')
    }

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

    


def post_image(event, context):
    base64_string = event['image'].split(",")[1]  # "data:image/png;base64," を削除
    image_data = safe_b64decode(base64_string)  # 画像ファイルをbase64からデコード
    bingo_id = int(event['bingoId'])
    store_number = event['store_number']
    user_id = event['userId']
    table = dynamodb.Table('BINGOSTATE2')
    
    response = table.query(
        KeyConditionExpression=Key('user_id').eq(user_id) & Key('bingo_id').eq(bingo_id)
    )
    
    item = response['Items'][0]
    
    if 'pi_' + store_number in item and not item['pi_' + store_number] == '':
       return {
            'statusCode': 409,
            'body': json.dumps('Already sent')
        }

    # 画像をS3にアップロード
    image_id = str(uuid.uuid4())
    image_key = f'bingo-images/{image_id}.jpg'  # 一意のキー
    tem = event['image'].split("/")
    tem = tem[1].split(";")
    contentType = "image/" + tem[0]
    s3.put_object(Bucket=BUCKET_NAME, Key=image_key, Body=image_data, ContentType=contentType)
    image_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{image_key}'

    if not response['Items'] or item['flag'] != 0:
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }

    item['pi_' + store_number] = image_url
    table.put_item(Item=item)

    return {
        'statusCode': 200,
        'body': json.dumps({
            'imageUrl': image_url,
            'imageId': image_id
        })
    }


def get_bingo(event, context):
    # BINGOテーブルを検索
    bingo_table = dynamodb.Table('BINGOSTATE2')
    
    response = bingo_table.scan(
        FilterExpression=Attr('flag').eq(3)
    )

    items = response['Items']

    if not items:
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }
    items = random.choice(items)
    
    reslut = set_bingo_info_json()
    
    reslut = get_store_name(int(items['bingo_id']), reslut)
    
    if reslut == -1:
        return {
            'statusCode': 404,
            'body': json.dumps('No store or bingo')
        }
    
    reslut = info_json_add(reslut, items)
    
    reslut = {
        'statusCode': 200,
        'body': reslut
    }
    
    return reslut


def post_keep(event, context):
    # use the DynamoDB object to select our table
    table = dynamodb.Table('BINGOSTATE2')
    user_id = event['userId']
    bingo_id = int(event['bingoId'])
    contributor_id = event['contributor_id']
    unique_id = str(uuid.uuid4())
    
    response = table.query(
        KeyConditionExpression=Key('user_id').eq(contributor_id) & Key('bingo_id').eq(bingo_id)
    )
    
    if not response['Items'] or response['Items'][0]['flag'] != 3:
        return {
            'statusCode': 404,
            'body': json.dumps('Bingo not found')
        }
    
    user_id = user_id + '-s'
    
    response = table.put_item(
        Item={
            'user_id': user_id,
            'bingo_id': bingo_id,
            'flag': 1
            })
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
    
    done_bingos = [item for item in items if item.get('flag') == 4 or item.get('flag') == 3]
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

def confirmation_id(event, context):
    user_id = event['userId']
   
    # BINGOSTATEテーブルを検索
    bingo_state_table = dynamodb.Table('ACCOUNT')
    response = bingo_state_table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )

    items = response['Items']
    
    if not any(item['user_id'] == user_id for item in items):
        return {
            'statusCode': 200,
            'body': json.dumps('You can use this id')
        }
    return {
           'statusCode': 200,
           'body': json.dumps('You cannot use this id')
    }

def get_store(event, context):
    store_id = int(event['storeId'])
   
    # BINGOSTATEテーブルを検索
    table = dynamodb.Table('STORE')
    response = table.query(
        KeyConditionExpression=Key('id').eq(store_id)
    )

    item = response['Items']
    
    if not any(item['id'] == store_id for item in response['Items']):
        return {
            'statusCode': 404,
            'body': json.dumps('No Store')
        }
    # お店を返す
    return {
        'statusCode': 200,
        'body': response['Items'][0]
    }
    
def update_acount(event, context):
    # use the DynamoDB object to select our table
    table = dynamodb.Table('ACCOUNT')
    table_name = 'ACCOUNT'
    user_id = event['userId']

    response = table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )
    

    if not response['Items']:
        return {
            'statusCode': 404,
            'body': json.dumps('User not found')
        }
    
    item = response['Items'][0]
    if 'mail_address' in event:
        item['mail_address'] = event['mail_address']
    if 'password' in event:
        item['password'] = event['password']
    if 'birthday_year' in event:
        item['birthday_year'] = event['birthday_year']
    if 'birthday_month' in event:
        item['birthday_month'] = event['birthday_month']
    if 'birthday_day' in event:
        item['birthday_day'] = event['birthday_day']
    if 'residence' in event:
        item['residence'] = event['residence']
    if 'new_userId' in event:
        item['user_id'] = event['new_userId']
        response = table.delete_item(
            Key={
                'user_id': user_id
            }
        )
    
    table.put_item(Item=item)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }
    
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
    bingo_id = int(now.strftime('%Y%m%d%H%M%S%f')) 
    
    new_bingo = table.put_item(
           Item={
                'bingo_id': bingo_id,
                'maker_id': event['makerId'],
                'good_number': '0',
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
    
def get_store_id(event, context):
    table = dynamodb.Table('BINGO')
    bingo_id = int(event['bingoId'])
    
    response = table.query(
        KeyConditionExpression=Key('bingo_id').eq(bingo_id)
    )
    
    if not response['Items']:
        return {
            'statusCode': 404,
            'body': json.dumps('No Bingo')
        }
    
    json_data = {}
    json_data['bingo_id'] = str(response['Items'][0]['bingo_id'])
    json_data['maker_id'] = response['Items'][0]['maker_id']
    json_data['good_number'] = response['Items'][0]['good_number']
    for i in range(1, 10):
        name = "store_id_" + str(i)
        json_data[name] = response['Items'][0][name]
    reslut = {
        'statusCode': 200,
        'body': json_data
    }
    return reslut
    
    
def get_review(event, context):
    table = dynamodb.Table('BINGOSTATE2')
    user_id = event['userId']
    bingo_id = int(event['bingoId'])
    store_number = event['storeNumber']
    
    response = table.query(
        KeyConditionExpression=Key('user_id').eq(user_id) & Key('bingo_id').eq(bingo_id)
    )
    
    if not response['Items']:
        return {
            'statusCode': 404,
            'body': json.dumps('No Bingo')
        }
        
    json_data = {}
    
    review_body = {k: float(v) if isinstance(v, Decimal) else v for k, v in response['Items'][0].items()}
    name = "star_atmosphere_" + store_number
    if name in review_body:
        json_data["star_atmosphere"] = review_body[name]
    else:
        json_data["star_atmosphere"] = "undefine"
    name = "star_cp_" + store_number
    if name in review_body:
        json_data["star_cp"] = review_body[name]
    else:
        json_data["star_cp"] = "undefine"
    name = "star_taste_" + store_number
    if name in review_body:
        json_data["star_taste"] = review_body[name]
    else:
        json_data["star_taste"] = "undefine"
    name = "review_" + store_number
    if name in review_body:
        json_data["review"] = review_body[name]
    else:
        json_data["review"] = "undefine"
        
    reslut = {
        'statusCode': 200,
        'body':json_data
    }
    return reslut
    
    
def post_store(event, context):
    table = dynamodb.Table('STORE')
    id = int(time.time() * 1e9)
    new_bingo = table.put_item(
           Item={
                'id': id,
                'address': event['address'],
                'name': event['name']
           }
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }
    
    
def get_done_bingo_number(event, context):
    table = dynamodb.Table('BINGOSTATE2')
    start = int(event['start'])
    

    if (event['period'] == 'Month' and not(start >= 0 and start <= 12)) or (event['period'] == 'Day' and not(start >= 0 and start <= 31)):
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid request')
        }
    
    if 'userId' in event:
        response = table.scan(
            FilterExpression=Attr('done_time').exists() & Attr('user_id').eq(event['userId'])
        )
    else:
        response = table.scan(
            FilterExpression=Attr('done_time').exists()
        )
    
    number = [0] * 6
    
    if event['period'] == 'Year':
        for i in response['Items']:
            year = int(i['done_time'][0:4])
            if year <= start and year >= start - 5:
                number[start - year] += 1
    elif event['period'] == 'Month':
        for i in response['Items']:
            year = int(i['done_time'][5:7])
            if year <= start and year >= start - 5:
                number[start - year] += 1
    elif event['period'] == 'Day':
        for i in response['Items']:
            year = int(i['done_time'][8:10])
            if year <= start and year >= start - 5:
                number[start - year] += 1
    else:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid request')
        }
    
    return {
        'statusCode': 200,
        'body': number
    }
    
def get_posted_bingo_number(event, context):
    table = dynamodb.Table('BINGOSTATE2')
    start = int(event['start'])
    

    if (event['period'] == 'Month' and not(start >= 0 and start <= 12)) or (event['period'] == 'Day' and not(start >= 0 and start <= 31)):
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid request')
        }
    if 'userId' in event:
        response = table.scan(
            FilterExpression=Attr('posted_time').exists() & Attr('user_id').eq(event['userId'])
        )
    else:
        response = table.scan(
            FilterExpression=Attr('posted_time').exists()
        )

    number = [0] * 6
    
    if event['period'] == 'Year':
        for i in response['Items']:
            year = int(i['posted_time'][0:4])
            if year <= start and year >= start - 5:
                number[start - year] += 1
    elif event['period'] == 'Month':
        for i in response['Items']:
            year = int(i['posted_time'][5:7])
            if year <= start and year >= start - 5:
                number[start - year] += 1
    elif event['period'] == 'Day':
        for i in response['Items']:
            year = int(i['posted_time'][8:10])
            if year <= start and year >= start - 5:
                number[start - year] += 1
    else:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid request')
        }
    
    return {
        'statusCode': 200,
        'body': number
    }
    
def search_account(event, context):
    name = event['name']
    table = dynamodb.Table('ACCOUNT')
    
    response = table.scan(
        FilterExpression=Attr('user_id').contains(name)
    )
    
    if not response['Items']:
        return {
            'statusCode': 200,
            'body': json.dumps('No Date')
        }
      
    reslut = [] 
    for i in response['Items']:
        reslut.append(i['user_id'])
    
    return {
        'statusCode': 200,
        'body': reslut
    }
    
def delete_account(event, context):
    user_id = event['userId']
    table = dynamodb.Table('ACCOUNT')

    # 指定されたuser_idを持つアイテムを削除
    response = table.delete_item(
        Key={
            'user_id': user_id
        }
    )

    # 削除操作の結果を返す
    if response.get('ResponseMetadata', {}).get('HTTPStatusCode') == 200:
        table = dynamodb.Table('BINGOSTATE2')
        response = table.query(
            KeyConditionExpression=Key('user_id').eq(user_id)
        )
        
        response2 = table.query(
            KeyConditionExpression=Key('user_id').eq(user_id + '-s')
        )

        items = [response['Items'], response2['Items']]
        if not response['Items'] and not response2['Items']: 
            return {
                'statusCode': 200,
                'body': json.dumps('All accounts successfully deleted')
            }

        # 各アイテムを削除
        for item1 in items:
            for item in item1:
                delete_response = table.delete_item(
                    Key={
                        'user_id': item['user_id'],
                        'bingo_id': item['bingo_id']  # ソートキーも指定
                    }
                )
                # 削除が失敗した場合のエラーハンドリング
                if delete_response.get('ResponseMetadata', {}).get('HTTPStatusCode') != 200:
                    return {
                        'statusCode': 400,
                        'body': json.dumps(f"Failed to delete account with user_id {item['user_id']} and bingo_id {item['bingo_id']}")
                    }

        # 全ての削除が成功した場合
        return {
            'statusCode': 200,
            'body': json.dumps('All accounts successfully deleted')
        }
    return {
        'statusCode': 400,
        'body': json.dumps('Failed to delete account')
    }
    
    
def get_all_number(event, context):
    reslut = [0] * 5
    
    table = dynamodb.Table('ACCOUNT')
    
    response = table.scan(Select='COUNT')
    
    reslut[0] = response['Count']
    
    table = dynamodb.Table('BINGOSTATE2')
    
    response = table.scan(
        FilterExpression=Attr('posted_time').exists(),
        Select='COUNT'
    )
    
    reslut[1] = response['Count']
    
    response = table.scan(
        FilterExpression=Attr('done_time').exists(),
        Select='COUNT'
    )
    
    reslut[2] = response['Count']
    
    response = table.scan(
        FilterExpression=Attr('flag').eq(0),
        Select='COUNT'
    )
    
    reslut[3] = response['Count']
    
    response = table.scan(
        FilterExpression=Attr('flag').eq(1),
        Select='COUNT'
    )
    
    reslut[4] = response['Count']
    
    return {
        'statusCode': 200,
        'body': reslut
    }
    
def search_store(event, context):
    name = event['name']
    table = dynamodb.Table('STORE')
    
    response = table.scan(
        FilterExpression=Attr('name').contains(name)
    )
    
    if not response['Items']:
        return {
            'statusCode': 200,
            'body': json.dumps('No Date')
        }
    
    return {
        'statusCode': 200,
        'body': response['Items']
    }
    
def update_store(event, context):
    table = dynamodb.Table('STORE')
    response = table.put_item(
        Item={
            'id': int(event['id']),
            'name': event['name'],
            'address': event['address']
        })
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
    }
    
def convert_decimal_to_float(d):
    #decimal型をfloat型に直す関数
    if isinstance(d, Decimal):
        return float(d)
    return d
    
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError
    
    
def set_review_json():
    x = {
        'star_cp_1' : "undefine",
        'star_cp_2' : "undefine",
        'star_cp_3' : "undefine",
        'star_cp_4' : "undefine",
        'star_cp_5' : "undefine",
        'star_cp_6' : "undefine",
        'star_cp_7' : "undefine",
        'star_cp_8' : "undefine",
        'star_cp_9' : "undefine",
        'star_taste_1' : "undefine",
        'star_taste_2' : "undefine",
        'star_taste_3' : "undefine",
        'star_taste_4' : "undefine",
        'star_taste_5' : "undefine",
        'star_taste_6' : "undefine",
        'star_taste_7' : "undefine",
        'star_taste_8' : "undefine",
        'star_taste_9' : "undefine",
        'star_atmosphere_1' : "undefine",
        'star_atmosphere_2' : "undefine",
        'star_atmosphere_3' : "undefine",
        'star_atmosphere_4' : "undefine",
        'star_atmosphere_5' : "undefine",
        'star_atmosphere_6' : "undefine",
        'star_atmosphere_7' : "undefine",
        'star_atmosphere_8' : "undefine",
        'star_atmosphere_9' : "undefine",
        'review_1' : "undefine",
        'review_2' : "undefine",
        'review_3' : "undefine",
        'review_4' : "undefine",
        'review_5' : "undefine",
        'review_6' : "undefine",
        'review_7' : "undefine",
        'review_8' : "undefine",
        'review_9' : "undefine"
    }
    
    return x

def set_bingo_info_json():
    x = {
        'user_id' : "undefine",
        'bingo_id' : "undefine",
        'flag' : "undefine",
        'pi_1' : "undefine",
        'pi_2' : "undefine",
        'pi_3' : "undefine",
        'pi_4' : "undefine",
        'pi_5' : "undefine",
        'pi_6' : "undefine",
        'pi_7' : "undefine",
        'pi_8' : "undefine",
        'pi_9' : "undefine",
        'store_name_1' : "undefine",
        'store_name_2' : "undefine",
        'store_name_3' : "undefine",
        'store_name_4' : "undefine",
        'store_name_5' : "undefine",
        'store_name_6' : "undefine",
        'store_name_7' : "undefine",
        'store_name_8' : "undefine",
        'store_name_9' : "undefine"
    }
    
    return x
    
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
    
def get_store_name(bingo_id, json_data):
    print(bingo_id)
    table = dynamodb.Table('BINGO')
    
    response = table.query(
        KeyConditionExpression=Key('bingo_id').eq(bingo_id)
    )

    
    if not response['Items']:
        return -1
    table = dynamodb.Table('STORE')

    for i in range(1, 10):
        name = "store_id_" + str(i)
        store_id = int(response['Items'][0][name])
        
        response2 = table.query(
            KeyConditionExpression=Key('id').eq(store_id)
        )
        
        if not response2['Items']:
            return -1
        name = "store_name_" + str(i)
        json_data[name] = response2['Items'][0]['name']

    return json_data
    
def safe_b64decode(data):
    padding = len(data) % 4
    if padding != 0:
        data += '=' * (4 - padding)
    return base64.urlsafe_b64decode(data)
