#店舗関連の関数

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
