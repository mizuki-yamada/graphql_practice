const { ApolloServer} = require("apollo-server")
const fs = require("fs")
const path = require("path")
const { getUserId } = require("./utils")

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// ref https://www.apollographql.com/docs/apollo-server/v2

// resolver
const resolvers = {
	// 返す値を定義する（playgroundで値を確認できる）
	Query: {
	  info: () => "HackerNewsクローン",
	  feed: async(parent, args, context) => {
		return context.prisma.link.findMany()
	  }
	},

	Mutation: {
		// argsはschemaで定義したpostが受け取る引数
		post: (parent, args, context) => {
			const newLink = context.prisma.link.create({
				data: {
					url: args.url,
					description: args.description,
				}
			})
			return newLink
	  }
	}
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