# API Documentation

このドキュメントでは、提供されるAPIの各関数について説明します。各関数は特定のタスクを実行し、JSON形式でデータを受け取りまた返します。  

## 戻り値の型  
戻り値の型は以下のようになっている。関数の説明で書かれている「戻り値」とはbodyの中身を指す  
```
{
    "statusCode": 200,
    "body": "これからはここが戻り値とする"
}
```

***json形式のビンゴの情報の形式***  
戻り値がjson形式のビンゴ情報の場合は以下のような形で帰ってくる。  
```
'user_id': null,
'bingo_id': null,
'flag': null,
'pi_1': null,
'pi_2': null,
'pi_3': null,
'pi_4': null,
'pi_5': null,
'pi_6': null,
'pi_7': null,
'pi_8': null,
'pi_9': null,
'store_name_1': null,
'store_name_2': null,
'store_name_3': null,
'store_name_4': null,
'store_name_5': null,
'store_name_6': null,
'store_name_7': null,
'store_name_8': null,
'store_name_9': null
```

## 目次  
- [アカウント関連](#アカウント関連)
  - [GET_AC](#get_ac)
  - [POST_AC](#post_ac)
  - [CONFIRMATION_ID](#confirmation_id)
  - [UPDATE_AC](#update_ac)
  - [DELETE_AC](#delete_ac)
- [ビンゴ関連](#ビンゴ関連)
  - [GET_BINGO](#get_bingo)
  - [POST_BINGO](#post_bingo)
  - [GET_KEEP_BINGO](#get_keep_bingo)
  - [POST_KEEP](#post_keep)
  - [GET_DONE_BINGO](#get_done_bingo)
  - [GET_MAKED_BINGO](#get_maked_bingo)
  - [GET_MYBINGO](#get_mybingo)
  - [POST_MYBINGO](#post_mybingo)
  - [POST_GOOD](#post_good)
  - [POST_PLAY](#post_play)
  - [GET_GOOD](#get_good)
- [レビュー関連](#レビュー関連)
  - [POST_REVIEW](#post_review)
  - [GET_REVIEW](#get_review)
  - [POST_IMAGE](#post_image)
- [店舗関連](#店舗関連)
  - [GET_STORE](#get_store)
  - [POST_STORE](#post_store)
  - [UPDATE_STORE](#update_store)
  - [GET_STORE_ID](#get_store_id)
- [総数などのデータ関連](#総数などのデータ関連)
  - [GET_DONE_BINGO_NUMBER](#get_done_bingo_number)
  - [GET_POSTED_BINGO_NUMBER](#get_posted_bingo_number)
  - [GET_ALL_NUMBER](#get_all_number)
- [検索関連](#検索関連)
  - [SEARCH_AC](#search_ac)
  - [SEARCH_STORE](#search_store)

## Functions  
* ## アカウント関連  
### GET_AC  
指定されたuserIdのアカウント情報を取得する  
* 引数  
```
{  
  "httpMethod": "GET_AC",  
  "userId": "kamide"  
}  
```  
* 戻り値  
  * 失敗　　No Acount  
  * 成功　　登録したjson形式のアカウント情報   
```
{  
    \"birthday_year\": \"2005\",  
    \"password\": \"kamikami\",  
    \"user_id\": \"kamide\",  
    \"birthday_day\": \"21\",  
    \"residence\": \"\\u77f3\\u5ddd\\u770c\", 
    \"birthday_month\": \"7\",  
    \"mail_address\": \"kamide@gmail.com\"  
}
```  

### POST_AC  
指定した情報を登録する(user_idを使えるか確認してから使う)  
* 引数
```
{  
    "httpMethod": "POST_AC",  
    "birthday_day": "21",  
    "birthday_month": "7",  
    "birthday_year": "2005",  
    "mail_address": "kamide@gmail.com",  
    "password": "kamikami",  
    "residence": "石川県",  
    "userId": "kamide"  
}
```
* 戻り値    
  * 成功　　Successful  

### CONFIRMATION_ID  
指定したuser_idが使えるか確認する  
* 引数
```
{  
    "httpMethod": "CONFIRMATION_ID",  
    "userId": "kamide4"  
}
```
* 戻り値  
  * 失敗　　You cannot use this id  
  * 成功　　You can use this id
 
### UPDATE_AC  
指定したuserIdの情報を指定した情報に書き換える(全てなくてもいいが、userIdとhttpMethodは必須)  
* 引数
```
{
    "httpMethod": "UPDATE_AC",  
    "birthday_day": "11",  
    "birthday_month": "6",  
    "birthday_year": "2005",  
    "mail_address": "kamide2@gmail.com",  
    "password": "kamikamidede",  
    "residence": "富山県",  
    "userId": "kamide",  
    "new_userId": "kamikami"  
}
```
* 戻り値  
  * 失敗　　User not found  
  * 成功　　Successful
 
### DELETE_AC  
指定したuserIdのアカウント、ビンゴを全て削除する  
* 引数
```
{  
    "httpMethod": "DELETE_AC",  
    "userId": "kamide6"  
}
```
* 戻り値
  * 成功　　All accounts successfully deleted
  * 失敗　　Failed to delete account

* ## ビンゴ関連

### GET_BINGO  
投稿されたビンゴから、指定したuserId以外のランダムな投稿されたビンゴを取得する  
* 引数
```
{  
    "httpMethod": "GET_BINGO",
    "userId": "kamide"  
}
```
* 戻り値  
  * 失敗　　Bingo not found  
  * 成功　　json形式のビンゴ情報の配列
 
### POST_BINGO  
指定したmakerIdのユーザーが指定したお店のビンゴを登録する  
* 引数
```
{  
    "httpMethod": "POST_BINGO",  
    "makerId": "kamide2",  
    "storeId_1": "0",  
    "storeId_2": "1",  
    "storeId_3": "2",  
    "storeId_4": "3",  
    "storeId_5": "4",  
    "storeId_6": "5",  
    "storeId_7": "6",  
    "storeId_8": "7",  
    "storeId_9": "8"  
}
```
* 戻り値  
  * 失敗　　Already posted  
  * 成功　　Successful
 
### GET_KEEP_BINGO  
自分が保存したビンゴを取得  
* 引数
```
{  
    "httpMethod": "GET_KEEP_BINGO",
    "userId": "kamide"   
}
```
* 戻り値  
  * 失敗　　No bingo  
  * 成功　　json形式のビンゴ情報の配列
 
### POST_KEEP  
指定したuserIdの人が、指定したcontributor_idの人が作った指定したbingoIdのビンゴを保存する  
* 引数
```
{  
    "httpMethod": "POST_KEEP",  
    "userId": "kamide",  
    "bingoId": "20240408045050",  
    "contributor_id": "kamide2"  
}
```
* 戻り値  
  * 失敗　　Already kept  
  * 成功　　Successful  
  
### GET_DONE_BINGO  
指定したuser_idの達成したビンゴを取得  
* 引数
```
{  
    "httpMethod": "GET_DONE_BINGO",  
    "userId": "kamide"  
}
```
* 戻り値  
  * 失敗　　No Bingo  
  * 成功　　ビンゴのjson形式の情報の配列

### GET_MAKED_BINGO  
自分が作ったビンゴを取得  
* 引数
```
{    
    "httpMethod": "GET_MAKED_BINGO",  
    "userId": "kamide"  
}
```
* 戻り値  
  * 失敗　　No bingo  
  * 成功　　json形式のビンゴ情報の配列　 
  
### GET_MYBINGO  
自分がプレイ中のビンゴを取得  
* 引数
```
{  
    "httpMethod": "GET_MYBINGO",  
    "userId": "kamide"  
}
```
* 戻り値  
  * 成功　　json形式のビンゴ情報

### POST_MYBINGO  
指定したuserId、bingoIdを投稿する  
* 引数
```
{  
    "httpMethod": "POST_MYBINGO",  
    "userId": "0",  
    "bingoId": "0"  
}
```
* 戻り値  
  * 失敗　　Bingo not found  
  * 成功　　Successful
 
### POST_GOOD  
指定したbingoIdにいいねする  
* 引数
```
{
    "httpMethod": "POST_GOOD",  
    "good_number": "2",  
    "bingoId": "20240408045050"  
}
```
* 戻り値  
  * 失敗　　Bingo not found  
  * 成功　　Successful

### POST_PLAY  
指定したuserIdの人が、指定したcontributor_idが作った指定したbingoIdのビンゴをプレイ中にする   
* 引数
```
{  
    "httpMethod": "POST_PLAY",  
    "userId": "kamide",  
    "bingoId": "20240408045050",  
    "contributor_id": "kamide2"  
}
```
* 戻り値
  * 失敗　　Bingo not found
  * 成功　　Successful

### GET_GOOD  
指定したbingo_idのいいねの数を取得する  
* 引数
```
{  
    "httpMethod": "GET_GOOD",  
    "bingoId": "20240408045050"
}
```
* 戻り値
  * 失敗　　No Bingo
  * 成功　　いいねの数(数値)
 
* ## レビュー関連  
  
### POST_REVIEW   
指定したuserId、bingoId、store_numberのお店のレビューを登録  
* 引数
```
{  
    "httpMethod": "POST_REVIEW",  
    "bingoId": "20240408045050",  
    "userId": "kamide",  
    "caption": "よかったです",  
    "starTaste": "4",  
    "starAtmosphere": "3",  
    "starCP": "5",  
    "store_number": "1"  
}
```
* 戻り値  
  * 失敗　　Incorrect store_number　　(store_numberが1から9の数字ではない場合)  
　　　　　　　Bingo not found　　　　　 (指定したuser_id、bingo_idがない、またはプレイ中ではない場合)  
　　　　　　　Already sent　　　　　　　　(すでにレビューが登録されていた場合)  
  * 成功　　Review posted successfully

### GET_REVIEW  
指定したuserId、bingoId、storeNumberのレビューを返す  
* 引数
```
{  
    "httpMethod": "GET_REVIEW",  
    "userId": "kamide",  
    "bingoId": "20240408045050",  
    "storeNumber": "1"  
}
```
* 戻り値  
  * 失敗  No Bingo  
  * 成功  json形式のレビュー(ビンゴが存在し、レビューがない場合はundefine)
```
{  
    "star_atmosphere_2": null,  
    "star_cp_2": null,  
    "star_taste_2": null,  
    "review_2": null  
}
```
 
### POST_IMAGE  
指定したuserId、binogId、store_numberのお店の写真をアップロードする  
* 引数
```
{  
    "httpMethod": "POST_IMAGE",  
    "bingoId": "20240408045050",  
    "userId": "kamide",  
    "store_number": "3",  
    "image": "エンコードされた画像",  
}
```
* 戻り値  
  * 失敗　　Bingo not found  
  * 成功　　json形式で、imageUrlに画像へのurl、imageIdに画像のid
```
{  
    \"imageUrl\": \"https://acc001-team-c-image-bucket.s3.amazonaws.com/bingo-images/94eecb68-26f0-4499-95bd-d5212b02bb52.jpg\",   
    \"imageId\": \"94eecb68-26f0-4499-95bd-d5212b02bb52\"  
}
```

* ## 店舗関連  
  
### GET_STORE  
指定したstoreIdの情報を取得  
* 引数
```
{  
    "httpMethod": "GET_STORE",  
    "storeId": "0"  
}
```
* 戻り値  
  * 失敗　　No  Store  
  * 成功　　json形式のお店の情報
``` 
{  
    \"address\": \"\\u77f3\\u5ddd\\u770c\\u304b\\u307b\\u304f\\u5e02\\u9ad8\\u677e\\u4e0142\",  
    \"id\": 0.0,  
    \"name\": \"\\u3055\\u3076\\u308d\\u3046\\u3079\\u3044\\u9ad8\\u677e\\u672c\\u5e97\"  
}   
```

### POST_STORE  
指定したお店の情報を登録する  
* 引数
```
{  
    "httpMethod": "POST_STORE",  
    "name": "8番ラーメン津幡店",  
    "address": "石川県河北郡津幡町横浜に72-1"  
}
```
* 戻り値  
  * 成功　　Successful
 
### UPDATE_STORE  
指定された情報に更新する(引数は全てないといけない)  
* 引数
```
{
    "httpMethod": "UPDATE_STORE",
    "id": "3",
    "name": "店舗名",
    "address": "住所"
}
```
* 戻り値
  * 成功　　Successful  

### GET_STORE_ID  
指定したbingoIdのビンゴの構成を返す  
* 引数
```
{  
    "httpMethod": "GET_STORE_ID",  
    "bingoId": "20240408045050"  
}
```
* 戻り値  
  * 失敗　　No Bingo  
  * 成功　　json形式のビンゴの構成  
          good_number(いいねの数)がない場合もある
```
{  
    "bingo_id": "20240409072915",  
    "maker_id": "kamide2",  
    "good_number": "0",  
    "store_id_1": "0",  
    "store_id_2": "1",  
    "store_id_3": "2",  
    "store_id_4": "3",  
    "store_id_5": "4",  
    "store_id_6": "5",  
    "store_id_7": "6",  
    "store_id_8": "7",  
    "store_id_9": "8"  
}  
```

* ## 総数などのデータ関連  

### GET_DONE_BINGO_NUMBER  
指定した期間に達成したビンゴの数を返す。また、引数にuserIdを指定すると、その人のデータが返ってくる  
* 引数
```
{  
    "httpMethod": "GET_DONE_BINGO_NUMBER",  
    "period": "Day",(または"Month"か"Year")  
    "start": "27",
    "userId": "kamide"
}
```
* 戻り値  
  * 失敗　　Invalid request(startの範囲が不適切な場合)  
　　　　    No data(データがない場合)  
  * 成功　　達成したビンゴの数  

### GET_POSTED_BINGO_NUMBER  
指定した期間に達成したビンゴの数を返す。また、引数にuserIdを指定すると、その人のデータが返ってくる  
* 引数
```
{  
    "httpMethod": "GET_POSTED_BINGO_NUMBER",  
    "period": "Day",(または"Month"か"Year")  
    "start": "27",
    "userId": "kamide"
}
```
* 戻り値  
  * 失敗　　Invalid request(startの範囲が不適切な場合)  
　　　　    No data(データがない場合)  
  * 成功　　達成したビンゴの数
 
### GET_ALL_NUMBER  
ユーザ総数、投稿、達成、プレイ中、保存されたビンゴの総数を返す  
* 引数
```
{
    "httpMethod": "GET_ALL_NUMBER"
}
```
* 戻り値
  * 成功　　ユーザ総数、投稿、達成、プレイ中、保存されたビンゴの総数の順番の数値の配列
 
* ## 検索関連

### SEARCH_AC  
指定した名前のアカウントを検索する  
* 引数
```
{
    "httpMethod": "SEARCH_AC",
    "name": "kami"
}
```
* 戻り値  
  * 失敗　　No Date
  * 成功　　検索の結果が入った文字列の配列　　

### SEARCH_STORE  
指定した名前の店舗を検索する  
* 引数
```
{
    "httpMethod": "SEARCH_STORE",
    "name": "金沢"
}
```
* 戻り値  
  * 失敗　　No Date
  * 成功　　検索の結果が入ったjsonの配列
```
[
    {
      "id": 8,
      "name": "おすしと原始焼 金沢 なかむら",
      "address": "石川県金沢市堀川町６−５"
    },
    {
      "id": 10,
      "name": "うなぎ四代目菊川 クロスゲート金沢店",
      "address": "石川県金沢市広岡１丁目５−３ クロスゲート金沢商業棟 2F"
    },
    {
      "id": 4,
      "name": "元祖 金沢炉端 あっぱれ 金沢片町店",
      "address": "石川県金沢市片町２丁目２−１５ 北國ビルディング B1F"
    }
]
```
