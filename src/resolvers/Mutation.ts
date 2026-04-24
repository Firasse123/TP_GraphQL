import { create } from "node:domain";

export const Mutation={
    CreateCv:async (parent,{input},{prisma,pubSub},info)=>{
        const { name, age, job, userId, skillsIds = [] } = input;

        const user=await prisma.user.findUnique({
            where:{id:userId}
        })
    
        if(!user){
            throw new Error(`User with id ${userId} not found`);
        }
        for (const skillId of skillsIds) {
            const skill=await prisma.skill.findUnique({
                where:{id:skillId}
            })
            if(!skill){
                throw new Error(`Skill with id ${skillId} not found`);
            }
        }
        const newCv=await prisma.cv.create({
            data:{
                name,
                age,
                job,
                ownerId:userId,
                skills:{
                    create: skillsIds.map((skillId) => ({ skillId }))
                    //Inserer dans le table de jointure cv_skill les relations entre le cv et les skills    
                }
            }
        })
        
        pubSub.publish("cvEvent", { cvEvent: { cv: newCv, mutationType: "CREATED" } });
        return newCv;

    },

    UpdateCv:async(parent,{id,input},{prisma,pubSub},info)=>{
        const { name, age, job, userId, skillsIds = [] } = input;

        const cv=await prisma.cv.findUnique({
            where:{id}
        })
        if(!cv){
            throw new Error(`CV with id ${id} not found`);
        }
        if(userId){
            const user=await prisma.user.findUnique({
                where:{id:userId}
            })
            if(!user){
                throw new Error(`User with id ${userId} not found`);
            }
        }
          if (skillsIds) {
            for (const skillId of skillsIds) {
                const skill = await prisma.skill.findUnique({ where: { id: skillId } });
                if (!skill) throw new Error(`Skill with id ${skillId} not found`);
            }
        }
        const updatceCv=await prisma.cv.update({
            where:{id},
            data:{
                ...name && { name:name },
                ...age && { age:age },
                ...job && { job:job },
                ...userId && { ownerId:userId },
                ...skillsIds && {
                    skills:{
                        deleteMany:{},
                        create: skillsIds.map((skillId) => ({ skillId }))
                    }
            }
        }
    })
        pubSub.publish("cvEvent", { cvEvent: { cv: updatceCv, mutationType: "UPDATED" } });
        return updatceCv;
    },

    DeleteCv:async(parent,{id},{prisma,pubSub},info)=>{
        const cv=await prisma.cv.findUnique({
            where:{id}
        })
        if(!cv){
            throw new Error(`CV with id ${id} not found`);
        }
        // Supprimer d'abord les relations CvSkil
        await prisma.cvSkill.deleteMany({
            where:{cvId:id}
        })

        const deletedCv=await prisma.cv.delete({
            where:{id}
        })
        pubSub.publish("cvEvent", { cvEvent: { cv: deletedCv, mutationType: "DELETED" } });
        return deletedCv;
    }





}