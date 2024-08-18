const jwt = require("jsonwebtoken")
const APP_SECRET = "Graphql"

// tokenを復号するための関数
function getTokenPayload(token) {
	// token化された物の前の情報（user.id）を復号する
	return jwt.verify(token,APP_SECRET)
}

// user idを取得する関数
 /*
	@param req 	GraphQLへのリクエスト（引数やヘッダ情報などを持ったリクエスト）
	@param authToken	
 */
function getUserId(req, authToken) {
	if (req) {
		// check header(認証権限の確認をする)
		const authHeader = req.headers.authorization
		if (authHeader) {
			const token = authHeader.replace("Bearer", "")
			if (!token) {
				throw new Error ("no token")
			}
			//  トークンを複合する
			const { userId } = getTokenPayload(token)
			return userId
		}
	} else if (authToken) {
		const { userId } = getTokenPayload(authToken)
		return userId
	}

	throw new Error ("not authorized")
}

module.exports = { APP_SECRET, getUserId }