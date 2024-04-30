#検索関連の関数

import json
import boto3
import uuid
import random
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.conditions import Attr
from decimal import Decimal
from datetime import datetime

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')

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
