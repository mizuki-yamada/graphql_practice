const { ApolloServer} = require("apollo-server")
const fs = require("fs")
const path = require("path")
const { getUserId } = require("./utils")

// resolvers
const Query =require("./resolvers/Query")
const Mutation =require("./resolvers/Mutation")
const Link =require("./resolvers/Link")
const User =require("./resolvers/User")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// ref https://www.apollographql.com/docs/apollo-server/v2

// resolver
const resolvers = {
	Query,
	Mutation,
	Link,
	User
  };

const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
	resolvers,
	// resolverの中であればprismaをどこでも使えるように、contextを設定
	context: ({ req }) => {
		return {
			...req,
			// 現存するreqにデータを追加する形になるので、スプレッド構文になる
			prisma,
			userId: req && req.headers.authorization ? getUserId(req) : null
		}
	}
})

  server.listen().then(({url})=>console.log(`start server @ ${url}`))