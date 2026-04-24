export const Mutation={
    CreateCv:(parent,{input},{db,pubSub},info)=>{
        const {name,age,job,userId,skillsIds=[]}=input;
            const user = db.users.find(u => u.id === userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }
            for (let skillId of skillsIds) {
                const skill = db.skills.find(s => s.id === skillId);
                if (!skill) {
                    throw new Error(`Skill with id ${skillId} not found`);
                }
            }
        const newCv={
            id:Number(db.cvs[db.cvs.length-1].id)+1,
            name,
            age,
            job,
            user:userId,
            skills:skillsIds}

        db.cvs.push(newCv);
        pubSub.publish("cvEvent",{cvEvent:{cv:newCv,mutationType:"CREATED"}});
        return newCv;

},

    UpdateCv:(parent,{id,input},{db,pubSub},info)=>{
        const cv = db.cvs.find(c => c.id === id);
        if (!cv) {
            throw new Error(`Cv with id ${id} not found`);
        }
         if (input.userId !== undefined) {
            const user = db.users.find(u => u.id === input.userId);
            if (!user) {
                throw new Error(`User with id ${input.userId} not found`);
            }
        }
        if (input.skillsIds !== undefined) {
            for (let skillId of input.skillsIds) {
                const skill = db.skills.find(s => s.id === skillId);
                if (!skill) {
                    throw new Error(`Skill with id ${skillId} not found`);
                }
            }
        }

        if (input.name !== undefined) cv.name = input.name;
        if (input.age !== undefined) cv.age = input.age;
        if (input.job !== undefined) cv.job = input.job;
        if (input.userId !== undefined) cv.user = input.userId;
        if (input.skillsIds !== undefined) cv.skills = input.skillsIds;

        pubSub.publish("cvEvent",{cvEvent:{cv,mutationType:"UPDATED"}});
        return cv;
    },
    DeleteCv(parent,{id},{db,pubSub},info){
        const cvIndex = db.cvs.findIndex(c => c.id === id);
        if (cvIndex === -1) {   
            throw new Error(`Cv with id ${id} not found`);
        }
        const deletedCv = db.cvs.splice(cvIndex, 1)[0];
        pubSub.publish("cvEvent",{cvEvent:{cv:deletedCv,mutationType:"DELETED"}});
        return deletedCv;
    }
}