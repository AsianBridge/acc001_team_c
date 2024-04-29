import account
import bingo
import review
import store
import number
import search

def lambda_handler(event, context):
    print('event  ' + str(event))
    # API Gatewayからのリクエストを処理するメインの関数
    http_method = event["httpMethod"]
    
    if http_method == "GET_AC":
        #アカウント情報を登録
        return account.get_account(event, context)
    elif http_method == "POST_AC":
        #アカウント情報を取得
        return account.post_account(event, context)
    elif http_method == "GET_MYBINGO":
        #自分のビンゴ情報を取得
        return bingo.get_mybingo(event, context)
    elif http_method == "POST_REVIEW":
        #お店のレビューを登録
        return review.post_review(event, context)
    elif http_method == "POST_MYBINGO":
        #他の人が見れるようにする(公開する)
        return bingo.post_mybingo(event, context)
    elif http_method == "GET_BINGO":
        #ランダムにビンゴ(詳細な情報も)を取得
        return bingo.get_bingo(event, context)
    elif http_method == "POST_IMAGE":
        #食べ物の画像を登録
        return review.post_image(event, context)
    elif http_method == "POST_KEEP":
        #ビンゴを保存する
        return bingo.post_keep(event, context)
    elif http_method == "POST_GOOD":
        #いいねする
        return bingo.post_good(event, context)
    elif http_method == "GET_MAKED_BINGO":
        #自分が作成したビンゴを取得
        return bingo.get_maked_bingo(event, context)
    elif http_method == "GET_DONE_BINGO":
        #自分が達成したビンゴを取得
        return bingo.get_done_bingo(event, context)
    elif http_method == "GET_KEEP_BINGO":
        #自分が保存したビンゴを取得
        return bingo.get_keep_bingo(event, context)
    elif http_method == "CONFIRMATION_ID":
        #idが使えるか(重複していないか)確認
        return account.confirmation_id(event, context)
    elif http_method == "GET_STORE":
        #お店の情報を取得
        return store.get_store(event, context)
    elif http_method == "POST_BINGO":
        #作ったビンゴを登録
        return bingo.post_bingo(event, context)
    elif http_method == "GET_STORE_ID":
        #お店のidを取得
        return store.get_store_id(event, context)
    elif http_method == "UPDATE_AC":
        #アカウント情報を更新
        return account.update_acount(event, context)
    elif http_method == "GET_REVIEW":
        #レビューを取得
        return review.get_review(event, context)
    elif http_method == "POST_STORE":
        #お店を登録
        return store.post_store(event, context) 
    elif http_method == "GET_DONE_BINGO_NUMBER":
        #達成したビンゴの数を取得
        return number.get_done_bingo_number(event, context)
    elif http_method == "GET_POSTED_BINGO_NUMBER":
        #投稿されたビンゴの数を取得
        return number.get_posted_bingo_number(event, context)
    elif http_method == "SEARCH_AC":
        #アカウントを検索する
        return search.search_account(event, context)
    elif http_method == "DELETE_AC":
        #アカウントを削除する
        return account.delete_account(event, context)
    elif http_method == "GET_ALL_NUMBER":
        #色々な総数を取得
        return number.get_all_number(event, context)
    elif http_method == "SEARCH_STORE":
        #お店を検索
        return search.search_store(event, context)
    elif http_method == "UPDATE_STORE":
        #お店を検索
        return store.update_store(event, context)
    else:
        return {
            "statusCode": 405,
            "body": json.dumps("Method not allowed")
        }
