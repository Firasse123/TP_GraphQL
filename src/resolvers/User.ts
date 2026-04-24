export const User = {
	cvs: (parent, _args, { db }, _info) => {
		return db.cvs.filter((cv) => cv.user === parent.id);
	}
};