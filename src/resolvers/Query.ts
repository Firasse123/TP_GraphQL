import { ensureSkillExists, ensureUserExists } from "./validation";

export const Query = {
    hello: () => "Hello World!",

    getAllCvs: async (parent, args, { prisma }, info) => {
        return prisma.cv.findMany({
            include: {
                user: true,
                skills: {
                    include: { skill: true }
                }
            }
        });
    },

    getCvById: async (parent, { id }, { prisma }, info) => {
        const cv = await prisma.cv.findUnique({
            where: { id },
            include: {
                user: true,
                skills: {
                    include: { skill: true }
                }
            }
        });
        if (!cv) throw new Error(`CV with id ${id} not found`);
        return cv;
    },

    getAllUsers: async (parent, args, { prisma }, info) => {
        return prisma.user.findMany({
            include: { cvs: true }
        });
    },

    getUserById: async (parent, { id }, { prisma }, info) => {
        await ensureUserExists(prisma, id);
        const user = await prisma.user.findUnique({
            where: { id },
            include: { cvs: true }
        });
        return user;
    },

    getAllSkills: async (parent, args, { prisma }, info) => {
        return prisma.skill.findMany();
    },

    getSkillById: async (parent, { id }, { prisma }, info) => {
        await ensureSkillExists(prisma, id);
    }
}