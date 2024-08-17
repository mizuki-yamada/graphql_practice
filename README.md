# 【GraphQL入門】RESTに代わるモダンAPIのGraphQLでニュースアプリAPIを構築しながら基礎を学ぶ入門講座 読書メモ

# GraphQLとは
- APIのクエリ言語
  - API：クライアントとサーバを中継する役回り
  - クエリ：お問い合わせ
  - クライアントがサーバに情報を問い合わせする際の方法の1つとして使われるのがGraphQL
- RESTとの違い
  - GraphQLに情報を集約するイメージ
  - エンドポイントを1つにまとめることができる
  - 欲しい情報だけを取得できる（余計な情報は取得しなくて済む）
  - 型指定でデータを明確にできる
- Apollo
  -  GraphQLのフロント・バックエンドライブラリ
     -  使うと簡単にGraphQLを扱える
  -  公式：https://www.apollographql.com/docs/

# ハンズオン
- apollov2を使っている（最新はv4）
  - v4にupgradeするのを発展としてやってもいいかも
- スキーマを定義する＝データ構造を定義する
- リゾルバ：定義したスキーマに対して、実際の値を入れる（解決する）
  - スキーマの`Query`とリゾルバの`Query`、スキーマで定義したフィールドにリゾルバでも一致させる必要がある
  - Mutation, Subscriptionもある
- QueryとMutation
  -  Query：取得（SELECT／GET）
  -  Mutation:読み書き（DELETE, POST など）