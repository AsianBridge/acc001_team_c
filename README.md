# acc001_team_c
Asian Challenge Cup第1回（2024/03/25〜2024/03/27開催） チームC用のリポジトリです。

React + Go + AWS App

# フロントエンド
## 使用技術一覧
![React](https://camo.qiitausercontent.com/c4a40a6ab784af30bdd4e6b51956362ad4139d9a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642)
![TypeScript](https://camo.qiitausercontent.com/a1c82dde1e505a2f11e0575cf726515a7112e072/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d547970655363726970742d3030303030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d74797065736372697074266c6f676f436f6c6f723d363144414642)


# バックエンド
## 1-使用技術一覧
![AWS](https://camo.qiitausercontent.com/80f7178661d22fbadfb685d5a336059bb829c25a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d416d617a6f6e2532306177732d3233324633452e7376673f6c6f676f3d616d617a6f6e2d617773267374796c653d666f722d7468652d6261646765)
![Python](https://camo.qiitausercontent.com/eb8e0216005c7badaaa4bf7eb2be4d177990d747/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d507974686f6e2d4632433633432e7376673f6c6f676f3d707974686f6e267374796c653d666f722d7468652d6261646765)

## 2-API用URL

<https://91mi77ivgg.execute-api.ap-northeast-1.amazonaws.com/dev>

## 3-インフラ図

![インフラ](https://github.com/AsianBridge/acc001_team_c/assets/142758536/80a4f68d-5fdb-4d4a-b8e8-da69a611f83e)

## 4-ファイル構成
lambdaで使用しているのは下の7個のファイル。メインのファイルはlamdba_function.py。
backend  
　├── Dockerfile  
　├── README.md  
　├── docker-compose.yml  
　├── go.mod  
　├── go.sum  
　├── main.go  
　├── post_cmd.txt  
　├── pre_cmd.txt  
　├── lambda_function.py  
　├── account.py  
　├── bingo.py  
　├── number.py  
　├── review.py  
　├── search.py  
　└── store.py  
　　

## 5-機能一覧
詳細な使い方などはbackendのREADME.mdに書いてあります。
* アカウント周辺
  * アカウント情報登録
  * アカウント情報取得
  * ID使用可能確認
  * アカウント情報更新
  * アカウント削除
* ビンゴ周辺
  * プレイ中のビンゴを取得
  * ビンゴを投稿
  * 投稿されたビンゴを取得
  * ビンゴを保存
  * いいねを送信
  * 作ったビンゴを取得
  * 達成したビンゴを取得
  * 保存したビンゴを取得
  * ビンゴ構成を登録
  * ビンゴをプレイ中にする
* レビュー周辺
  * レビュー登録
  * レビュー取得
  * 画像登録
* 店舗周辺
  * 店舗情報取得
  * 店舗情報登録
  * 店舗情報更新
  * 店舗ID取得
* 統計データ周辺
  * 達成したビンゴの総数取得
  * 登録したビンゴの総数取得
  * ユーザ数、達成、登録、プレイ中、保存したビンゴの総数取得
