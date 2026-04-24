export const Cv = {
  user: async(parent, _args, { prisma }, _info) => {
    return await prisma.user.findUnique({
      where:{id: parent.ownerId}
    }
    );
  },

  skills: async (parent, _args, { prisma }, _info) => {
    const cvSkills= await prisma.cvSkill.findMany({
      where:{
        cvId: parent.id},
        include:{skill:true}

      }
    )
    
    return cvSkills.map(cvSkill => cvSkill.skill);
  }
  };