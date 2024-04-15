***GET_AC***  
指定されたuserIdのアカウント情報を取得する  
引数  
{  
  "httpMethod": "GET_AC",  
  "userId": "kamide"  
}  
戻り値  
失敗　　No Acount  
成功　　登録したアカウント情報   
{  
  "statusCode": 200,  
  "body": "[{\"birthday_year\": \"2005\", \"password\": \"kamikami\", \"user_id\": \"kamide\", \"birthday_day\": \"21\", \"residence\": \"\\u77f3\\u5ddd\\u770c\", \"birthday_month\": \"7\", \"mail_address\": \"kamide@gmail.com\"}]"  
}  

***POST_AC***  
指定した情報を登録する(user_idを使えるか確認はしない)  
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
戻り値  
成功　　Successful  

***CONFIRMATION_ID***  
指定したuser_idが使えるか確認する  
{  
  "httpMethod": "CONFIRMATION_ID",  
  "userId": "kamide4"  
}  
戻り値  
失敗　　You cannot use this id  
成功　　You can use this id  
  
***GET_DONE_BINGO***  
指定したuser_idの達成したビンゴを取得  
{  
  "httpMethod": "GET_DONE_BINGO",  
  "userId": "kamide"  
}  
戻り値  
失敗　　No Bingo  
成功　　ビンゴのjson形式の情報  
bodyには「user_id」「flag」「bingo_id」「star_cp_1」(1〜9)「star_taste_1」(1〜9)「star_atmosphere_1」(1〜9)「review_1」(1〜9)「pi_1」(1〜9)が入っている可能性がある  
(登録していない情報は返ってこない)  
{  
  "statusCode": 200,  
  "body": "{\"user_id\": \"kamide\", \"flag\": \"4\", \"star_cp_1\": \"5\", \"bingo_id\": 20240408045050.0, \"review_1\": \"\\u3088\\u304b\\u3063\\u305f\\u3067\\u3059\", \"pi_3\": \"https://acc001-team-c-image-bucket.s3.amazonaws.com/bingo-images/988df94c-e8b9-42b3-b566-a5ea0d075101.jpg\", \"star_taste_1\": \"4\", \"star_atmosphere_1\": \"3\"}"  
}  
  
***GET_MYBINGO***  
自分がプレイ中のビンゴを取得  
{  
  "httpMethod": "GET_MYBINGO",  
  "userId": "kamide"  
}  
戻り値  
成功　　json形式のビンゴ情報  
bodyには「user_id」「flag」「bingo_id」「star_cp_1」(1〜9)「star_taste_1」(1〜9)「star_atmosphere_1」(1〜9)「review_1」(1〜9)「pi_1」(1〜9)が入っている可能性がある  
(登録していない情報は返ってこない)  
{  
  "statusCode": 200,  
  "body": "{\"user_id\": \"kamide\", \"flag\": \"0\", \"star_cp_1\": \"5\", \"bingo_id\": 20240408045050.0, \"review_1\": \"\\u3088\\u304b\\u3063\\u305f\\u3067\\u3059\", \"pi_3\": \"https://acc001-team-c-image-bucket.s3.amazonaws.com/bingo-images/988df94c-e8b9-42b3-b566-a5ea0d075101.jpg\", \"star_taste_1\": \"4\", \"star_atmosphere_1\": \"3\"}"  
}  
  
***GET_KEEP***  
自分が保存したビンゴを取得  
{  
  "httpMethod": "GET_KEEP",  
  "userId": "kamide"   
}  
戻り値  
失敗　　No bingo  
成功　　json形式のビンゴ情報  
bodyには「user_id」「flag」「bingo_id」「star_cp_1」(1〜9)「star_taste_1」(1〜9)「star_atmosphere_1」(1〜9)「review_1」(1〜9)「pi_1」(1〜9)が入っている可能性がある  
(登録していない情報は返ってこない)  
{  
  "statusCode": 200,  
  "body": "{\"user_id\": \"kamide2\", \"flag\": \"1\", \"bingo_id\": 20240408045050.0}"  
}  
  
***GET_MAKED_BINGO***  
自分が作ったビンゴを取得  
{  
  "httpMethod": "GET_MAKED_BINGO",  
  "userId": "kamide"  
}  
戻り値  
失敗　　No bingo  
成功　　json形式のビンゴ情報　 
bodyには「user_id」「flag」「bingo_id」「star_cp_1」(1〜9)「star_taste_1」(1〜9)「star_atmosphere_1」(1〜9)「review_1」(1〜9)「pi_1」(1〜9)が入っている可能性がある  
(登録していない情報は返ってこない)  
{  
  "statusCode": 200,  
  "body": "{\"user_id\": \"kamide\", \"flag\": \"2\", \"star_cp_1\": \"5\", \"bingo_id\": 20240408045050.0, \"review_1\": \"\\u3088\\u304b\\u3063\\u305f\\u3067\\u3059\", \"pi_3\": \"https://acc001-team-c-image-bucket.s3.amazonaws.com/bingo-images/988df94c-e8b9-42b3-b566-a5ea0d075101.jpg\", \"star_taste_1\": \"4\", \"star_atmosphere_1\": \"3\"}"  
}  
  
***POST_REVIEW***  
指定したuserId、bingoId、store_numberのお店のレビューを登録  
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
戻り値  
失敗　　Incorrect store_number　　(store_numberが1から9の数字ではない場合)  
失敗　　Bingo not found　　　　　 (指定したuser_id、bingo_idがない、またはプレイ中ではない場合)  
失敗　　Already sent　　　　　　　　(すでにレビューが登録されていた場合)  
成功　　Review posted successfully  
  
***GET_STORE***  
指定したstoreIdの情報を取得  
{  
  "httpMethod": "GET_STORE",  
  "storeId": "0"  
}  
戻り値  
失敗　　No  Store  
成功　　json形式のお店の情報  
{  
  "statusCode": 200,  
  "body": "[{\"address\": \"\\u77f3\\u5ddd\\u770c\\u304b\\u307b\\u304f\\u5e02\\u9ad8\\u677e\\u4e0142\", \"id\": 0.0, \"name\": \"\\u3055\\u3076\\u308d\\u3046\\u3079\\u3044\\u9ad8\\u677e\\u672c\\u5e97\"}]"  
}  
  
***POST_MYBINGO***  
指定したuserId、bingoIdを投稿する  
{  
  "httpMethod": "POST_MYBINGO",  
  "userId": "0",  
  "bingoId": "0"  
}  
戻り値  
失敗　　Bingo not found  
成功　　Successful  
  
***GET_BINGO***  
投稿されたビンゴからランダムにビンゴを取得する  
{  
  “httpMethod”: “GET_BINGO”  
}  
戻り値  
失敗　　Bingo not found  
成功　　json形式のビンゴの情報  
bodyには「user_id」「flag」「bingo_id」「star_cp_1」(1〜9)「star_taste_1」(1〜9)「star_atmosphere_1」(1〜9)「review_1」(1〜9)「pi_1」(1〜9)が入っている可能性がある  
(登録していない情報は返ってこない)  
{   
  "statusCode": 200,  
  "body": "{\"user_id\": \"kamide\", \"flag\": \"3\", \"star_cp_1\": \"5\", \"bingo_id\": 20240408045050.0, \"review_1\": \"\\u3088\\u304b\\u3063\\u305f\\u3067\\u3059\", \"pi_3\": \"https://acc001-team-c-image-bucket.s3.amazonaws.com/bingo-images/988df94c-e8b9-42b3-b566-a5ea0d075101.jpg\", \"star_taste_1\": \"4\", \"star_atmosphere_1\": \"3\"}"  
}  
  
***POST_KEEP***  
指定したuserIdの人が指定した、contributor_idが作った指定したbingoIdのビンゴを保存する  
{  
 "httpMethod": "POST_KEEP",  
 "userId": "kamide",  
 "bingoId": "20240408045050",  
 "contributor_id": "kamide2"  
}  
戻り値  
失敗　　Already kept  
成功　　Successful  
  
***POST_GOOD***  
指定したbingoIdにいいねする  
{  
  "httpMethod": "POST_GOOD",  
  "good_number": "2",  
  "bingoId": "20240408045050"  
}   
戻り値  
失敗　　Bingo not found  
成功　　Successful  
  
***POST_IMAGE***  
指定したuserId、binogId、store_numberのお店の写真をアップロードする  
{  
  "httpMethod": "POST_IMAGE",  
  "bingoId": "20240408045050",  
  "userId": "kamide",  
  "store_number": "3",  
  “image”: “エンコードされた画像”,  
}  
戻り値  
失敗　　Bingo not found  
成功　　json形式で、imageUrlに画像へのurl、imageIdに画像のid  
{  
  "statusCode": 200,  
  "body": "{\"imageUrl\": \"https://acc001-team-c-image-bucket.s3.amazonaws.com/bingo-images/94eecb68-26f0-4499-95bd-d5212b02bb52.jpg\", \"imageId\": \"94eecb68-26f0-4499-95bd-d5212b02bb52\"}"  
}  
  
***UPDATE_AC***  
指定したuserIdの情報を指定した情報に書き換える(全てなくてもいいが、userIdとhttpMethodは必須)  
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
戻り値  
失敗　　User not found  
成功　　Successful  
  
***POST_BINGO***  
指定したmakerIdのユーザーが指定したお店のビンゴを登録する  
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
戻り値  
失敗　　Already posted  
成功　　Successful  
