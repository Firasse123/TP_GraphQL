export const Cv = {
  user: (parent, _args, { db }, _info) => {
    return db.users.find((user) => user.id == parent.user);
  },
  skills: (parent, _args, { db }, _info) => {
    return db.skills.filter((skill) => parent.skills?.includes(skill.id));
  },
};