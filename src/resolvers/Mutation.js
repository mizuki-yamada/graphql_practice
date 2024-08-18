// resolver for add user Mutation
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// 署名するための鍵、サーバ側のみが持つ。第3者がtokenを拾ってもこのAPP_SECRETを知らないと複合はできない。
const APP_SECRET = "Graphql"

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
	const token = jwt.sign({ userId: user.id }, APP_SECRET)
	// schema.graphqlで定義した戻り値の型を合うデータを返す
	return {token,user}
}