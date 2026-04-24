export const Query={
    getAllCvs:async(parent,args,{prisma},info)=>{
        return await prisma.cv.findMany();

    },

    getCvById:async(parent,{id},{prisma},info)=>{
        const cv= prisma.findUnique({
            where:{id}
        })
        if(!cv){
             throw new Error(`CV with id ${id} not found`);
        }
        return cv;
    },

    getAllUsers:async(parent,args,{prisma},info)=>{
        return await prisma.user.findMany();
    },

    getUserById:async(parent,{id},{prisma},info)=>{
        const user=prisma.user.findUnique({
            where:{id}
        }
    )
        if(!user){
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    },

    getAllSkills:async(parent,args,{prisma},info)=>{
        return await prisma.skill.findMany();
    },

    getSkillById:async(parent,{id},{prisma},info)=>{
        const skill=prisma.skill.findUnique({
            where:{id}
        })
        if(!skill){
            throw new Error(`Skill with id ${id} not found`);
        }
        return skill;
    }
}