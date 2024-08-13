const {ApolloServer, gql} = require("apollo-server")

// ref https://www.apollographql.com/docs/apollo-server/v2

// define schema
const typeDefs = gql`
	type Query {
		info: String!
	}
`

// resolver
const resolvers = {
	Query: {
	  info: () => "HackerNewsクローン",
	},
  };