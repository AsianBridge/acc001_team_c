#アカウント関連の

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

def post_initial_account(event, context):
    table = dynamodb.Table('ACCOUNT')
    user_id = str(uuid.uuid4())
    
    response = table.put_item(
        Item={
            'mail_address': event['mail_address'],
            'password': event['password'],
            'user_id': user_id
            })
    return {
        'statusCode': 200,
        'body': json.dumps(user_id)
    }

def post_account(event, context):
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
    
def confirmation_id(event, context):
    user_id = event['userId']
   
    # BINGOSTATEテーブルを検索
    table = dynamodb.Table('ACCOUNT')
    response = table.query(
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
    
def update_acount(event, context):
    # use the DynamoDB object to select our table
    table = dynamodb.Table('ACCOUNT')
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
    
    if 'new_userId' in event:
        table = dynamodb.Table('BINGOSTATE2')
        response = table.query(
            KeyConditionExpression=Key('user_id').eq(user_id)
        )
        
        if response['Items']:
            for i in response['Items']:
                tem = i;
                tem['user_id'] = event['new_userId']
                table.put_item(Item=tem)
                response = table.delete_item(
                    Key={
                        'bingo_id': tem['bingo_id'],
                        'user_id': user_id,
                    }
                )

        table = dynamodb.Table('BINGO')
        response = table.scan(
            FilterExpression=Attr('maker_id').eq(user_id)
        )

        if response['Items']:
            for i in response['Items']:
                tem = i;
                tem['maker_id'] = event['new_userId']
                table.put_item(Item=tem)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successful')
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
    
def convert_decimal_to_float(d):
    #decimal型をfloat型に直す関数
    if isinstance(d, Decimal):
        return float(d)
    return d
