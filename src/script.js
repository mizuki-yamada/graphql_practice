// DBにアクセスするためのクライアントライブラリ
// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
	const newLink = await prisma.link.create({
		data: {
			description:"graphql handson",
			url: "test"
		}
	})

	const allLinks = await prisma.link.findMany()
	console.log(allLinks)
}

main()
	.catch(error => { throw new Error(error) })
	.finally(async () => {
		// DBとの接続を閉じる
		prisma.$disconnect
	})