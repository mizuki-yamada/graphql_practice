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
-  Prismaを使ったデータベース操作
   -  Prisma：次世代オープンソースORM
   -  ORM： Object Relational Mapping
      -  すごく簡単にいうと、JavaScriptの構文を使ってデータベースを操作できるようにするもの
      -  SQLを知らなくても大丈夫！
   -  https://www.prisma.io/
   -  https://qiita.com/am_765/items/5e42bd5f87b296f61fbc
-  `npx prisma init`
-  `npx prisma migrate dev`: schema.prismaを更新するたびに実行する必要あり
   -  データモデルの定義が変わるので
-  Relations
   -  モデル同士に関係がある場合、schema内でその関係を明示的に定義する必要がある
   -  https://www.prisma.io/docs/orm/prisma-schema/data-model/relations