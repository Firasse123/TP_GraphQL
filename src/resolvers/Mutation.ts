import { ensureSkillsExist, ensureUserExists } from "./validation";

export const Mutation={
    CreateCv:async (parent,{input},{prisma,pubSub},info)=>{
        const { name, age, job, userId, skillsIds = [] } = input;

        await ensureUserExists(prisma, userId);
        await ensureSkillsExist(prisma, skillsIds);

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
        const { name, age, job, userId, skillsIds } = input;

        const cv=await prisma.cv.findUnique({
            where:{id}
        })
        if(!cv){
            throw new Error(`CV with id ${id} not found`);
        }
        if(userId){
            await ensureUserExists(prisma, userId);
        }
        if (skillsIds !== undefined) {
            await ensureSkillsExist(prisma, skillsIds);
        }
        const updateData = {
            ...(name !== undefined && { name }),
            ...(age !== undefined && { age }),
            ...(job !== undefined && { job }),
            ...(userId !== undefined && { ownerId: userId }),
            ...(skillsIds !== undefined && {
                skills: {
                    deleteMany: {},
                    create: skillsIds.map((skillId) => ({ skillId }))
                }
            })
        };
        const updatceCv=await prisma.cv.update({
            where:{id},
            data: updateData
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