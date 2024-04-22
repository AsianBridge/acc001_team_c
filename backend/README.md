***json形式のビンゴの情報の形式***  
[  
　　{  
　　　"statusCode": 200,  
　　　"body":   
　　　　"{  
　　　　　　\"user_id\": \"kamide2\",  
　　　　　　\"bingo_id\": 20240408051917.0,  
　　　　　　\"flag\": 4.0,  
　　　　　　\"pi_1\": \"undefine\",  
　　　　　　\"pi_2\": \"undefine\",  
　　　　　　\"pi_3\": \"undefine\",  
　　　　　　\"pi_4\": \"undefine\",  
　　　　　　\"pi_5\": \"undefine\",  
　　　　　　\"pi_6\": \"undefine\",  
　　　　　　\"pi_7\": \"undefine\",  
　　　　　　\"pi_8\": \"undefine\",  
　　　　　　\"pi_9\": \"undefine\"   
　　　　}"  
　}  
]  

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
　"body":  
　　　"{  
　　　\"birthday_year\": \"2005\",  
　　　\"password\": \"kamikami\",  
　　　\"user_id\": \"kamide\",  
　　　\"birthday_day\": \"21\",  
　　　\"residence\": \"\\u77f3\\u5ddd\\u770c\", 
　　　\"birthday_month\": \"7\",  
　　　\"mail_address\": \"kamide@gmail.com\"  
　}"   
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
  
***GET_MYBINGO***  
自分がプレイ中のビンゴを取得  
{  
  "httpMethod": "GET_MYBINGO",  
  "userId": "kamide"  
}  
戻り値  
成功　　json形式のビンゴ情報     
  
***GET_KEEP_BINGO***  
自分が保存したビンゴを取得  
{  
　　"httpMethod": "GET_KEEP_BINGO",  
　　"userId": "kamide"   
}  
戻り値  
失敗　　No bingo  
成功　　json形式のビンゴ情報  
  
***GET_MAKED_BINGO***  
自分が作ったビンゴを取得  
{    
　　"httpMethod": "GET_MAKED_BINGO",  
　　"userId": "kamide"  
}  
戻り値  
失敗　　No bingo  
成功　　json形式のビンゴ情報　 
  
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
　　"body": "  
　　　{  
　　　　\"address\": \"\\u77f3\\u5ddd\\u770c\\u304b\\u307b\\u304f\\u5e02\\u9ad8\\u677e\\u4e0142\",  
　　　　\"id\": 0.0,  
　　　　\"name\": \"\\u3055\\u3076\\u308d\\u3046\\u3079\\u3044\\u9ad8\\u677e\\u672c\\u5e97\"  
　　　}"   
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
成功　　json形式のビンゴ情報  
  
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
　　"body":  
　　　"{  
　　　　　\"imageUrl\": \"https://acc001-team-c-image-bucket.s3.amazonaws.com/bingo-images/94eecb68-26f0-4499-95bd-d5212b02bb52.jpg\",   
　　　　　\"imageId\": \"94eecb68-26f0-4499-95bd-d5212b02bb52\"  
　　　　}"   
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

***GET_STORE_ID***  
指定したbingoIdのビンゴの構成を返す  
{  
　　"httpMethod": "GET_STORE_ID",  
　　"bingoId": "20240408045050"  
}  
戻り値  
失敗　　No Bingo  
成功　　json形式のビンゴの構成  
good_number(いいねの数)がない場合もある  
{  
　　"statusCode": 200,  
　　"body":  
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
}  

***GET_REVIEW***  
指定したuserId、bingoId、storeNumberのレビューを返す  
{  
　　"httpMethod": "GET_REVIEW",  
　　"userId": "kamide",  
　　"bingoId": "20240408045050",  
　　"storeNumber": "1"  
}  
戻り値  
失敗  No Bingo  
成功  json形式のレビュー(ビンゴが存在し、レビューがない場合はundefine)  
[  
　{  
　　　"statusCode": 200,  
　　　"body":  
　　　　　　{  
　　　　　　　"star_atmosphere_2": "undefine",  
　　　　　　　"star_cp_2": "undefine",  
　　　　　　　"star_taste_2": "undefine",  
　　　　　　　"review_2": "undefine"  
　　　　}  
　}  
]  
