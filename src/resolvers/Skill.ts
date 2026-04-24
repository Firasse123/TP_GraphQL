export const Skill = {
	cvs: (parent, _args, { db }, _info) => {
		return db.cvs.filter((cv) => cv.skills?.includes(parent.id));
	},
};