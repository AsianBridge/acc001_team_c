#レビュー関連の関数

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

# create an S3 object using the AWS SDK
s3 = boto3.client('s3')
BUCKET_NAME = 'acc001-team-c-image-bucket'  # S3バケット名

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')

def post_review(event, context):
    user_id = event['userId']
    bingo_id = int(event['bingoId'])
    star_taste = event['starTaste']
    star_atmosphere = event['starAtmosphere']
    star_cp = event['starCP']
    store_number = event['store_number']
    
    if not (store_number == 1 or store_number == 2 or store_number == 3 or store_number == 4 or store_number == 5 or store_number == 6 or store_number == 7 or store_number == 8 or store_number == 9):
        return {
            'statusCode': 400,
            'body': json.dumps('Incorrect store_number')
        }
        
    store_number = str(store_number)

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
    
    if not response['Items']:
        return {
            'statusCode': 404,
            'body': json.dumps('No Bingo')
        }
    
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
        json_data["star_atmosphere"] = None
    name = "star_cp_" + store_number
    if name in review_body:
        json_data["star_cp"] = review_body[name]
    else:
        json_data["star_cp"] = None
    name = "star_taste_" + store_number
    if name in review_body:
        json_data["star_taste"] = review_body[name]
    else:
        json_data["star_taste"] = None
    name = "review_" + store_number
    if name in review_body:
        json_data["review"] = review_body[name]
    else:
        json_data["review"] = None
        
    reslut = {
        'statusCode': 200,
        'body':json_data
    }
    return reslut
    
def safe_b64decode(data):
    padding = len(data) % 4
    if padding != 0:
        data += '=' * (4 - padding)
    return base64.urlsafe_b64decode(data)
