// resolver for add user Mutation
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// 署名するための鍵、サーバ側のみが持つ。第3者がtokenを拾ってもこのAPP_SECRETを知らないと複合はできない。
const APP_SECRET = require("../utils")

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

async function login(parent, args, context) {
	const user = await context.prisma.user.findUnique({
		where: {email:args.email}
	})
	if (!user) {
		throw new Error ("user does not exist")
	}

	// passwordの比較
	const valid = await bcrypt.compare(args.password, user.password)
	if (!valid) {
		throw new Error ("invalid password")
	}

	// userが存在していて、パスワードも正しいので、ユーザ情報を暗号化
	const token = jwt.sign({ userId: user.id }, APP_SECRET)
	// schema.graphqlで定義した戻り値の型を合うデータを返す
	return {token,user}
}

// newsを投稿するresolver
async function post(parent, args, context) {
	const {userId} = context
	return await context.prisma.link.create({
		data: {
			url: args.url,
			description: args.description,
			// userモデルとの関係を示すためにconnectを使う
			postedBy: {connect: {id: userId}}
		}
	})
}

module.exports = {
	singup,
	login,
	post,
}