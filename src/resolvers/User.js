function links(parent, args, context) {
	return context.prisma.user.findUnique({
		where: {
			id: parent.id
		}
		// fieldに対するresolverなので、関数としてreturnする必要がある
	}).links()
}

module.exports = {
	links
}