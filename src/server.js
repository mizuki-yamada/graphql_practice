const { ApolloServer, gql } = require("apollo-server")
const fs = require("fs")
const path = require("path")

// ref https://www.apollographql.com/docs/apollo-server/v2

// HackerNewsの1つ1つの投稿
const links = [
	{
		id: "link-0",
		description: "graphql handson",
		url: "test"
	}
]

// resolver
const resolvers = {
	// 返す値を定義する（playgroundで値を確認できる）
	Query: {
	  info: () => "HackerNewsクローン",
	  feed: () => links
	},

	Mutation: {
		// argsはschemaで定義したpostが受け取る引数
		post: (parent, args) => {
			let idCount = links.length;

			const link = {
				id: `links-${idCount}`,
				description: args.description,
				url:args.url
			}
			links.push(link)
			return link
	  }
	}
  };

const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
	resolvers
})

  server.listen().then(({url})=>console.log(`start server @ ${url}`))