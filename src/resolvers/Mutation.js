// resolver for add user Mutation
const bcrypt = require("bcryptjs");

// ここでのargsはschema.graphqlで設定したsignupが受け取る3つの引数
async function singup(parent, args, context) {
	// set password
	const password = await bcrypt.hash(args.password, 10)

	// create user
	const user = await context.prisma.user.create({
		data: {
			...args,
			// argsで受け取ったpasswordからハッシュ化したpasswordに更新したデータでuser createする
			password
		}
	})
}