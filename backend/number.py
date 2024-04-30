#総数などを取得する関数

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
