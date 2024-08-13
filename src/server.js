const {ApolloServer, gql} = require("apollo-server")

// ref https://www.apollographql.com/docs/apollo-server/v2

// HackerNewsの1つ1つの投稿
const links = [
	{
		id: "link-0",
		description: "graphql handson",
		url: "test"
	}
]

// define schema
const typeDefs = gql`
	type Query {
		info: String!
		feed : [Link]!
	}

	type Link {
		id: ID!
		description: String!
		url: String!
	}
`

// resolver
const resolvers = {
	// 返す値を定義する（playgroundで値を確認できる）
	Query: {
	  info: () => "HackerNewsクローン",
	  feed: () => links
	},
  };

  const server = new ApolloServer({typeDefs,resolvers})

  server.listen().then(({url})=>console.log(`start server @ ${url}`))