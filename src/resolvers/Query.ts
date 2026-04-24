import { get } from "node:http";

export const Query = {
    hello: () => "Hello World!",

    getAllCvs:(parent ,args,{db},info) => {
        return db.cvs;
    },
    getCvById:(parent ,{id},{db},info) => {
        const cv = db.cvs.find(cv=>cv.id==id);
        if(!cv){
            throw new Error(`CV with id ${id} not found`);
    }
    return cv;
},
    getAllUsers:(parent ,args,{db},info) => {
        return db.users;
},
    getUserById:(parent,{id},{db},info)=>{
        const user=db.users.find(user=>user.id==id);
        if(!user){
            throw new Error(`User with id ${id} not found`);
        }
        else{
            return user;
        }
    },
    getAllSkills:(parent ,args,{db},info) => {
        return db.skills;
    },
    getSkillById:(parent,{id},{db},info)=>{
        const skill=db.skills.find(skill=>skill.id==id);
        if(!skill){
            throw new Error(`Skill with id ${id} not found`);
        }   
        else{
            return skill;
}
    }
}
