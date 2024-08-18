// 誰によって投稿されたのかのresolver

function postedBy(parent, args, context) {
	return context.prisma.link.findUnique({
		where: {
			id: parent.id
		}
		// fieldに対するresolverなので、関数としてreturnする必要がある
	}).postedBy()
}

module.exports = {
	postedBy
}