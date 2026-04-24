export const User = {
	cvs: (parent, _args, { prisma }, _info) => {
		return prisma.cv.findMany({
			where:{
				ownerId: parent.id
			}
		})
	}
};