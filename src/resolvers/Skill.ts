export const Skill = {
    cvs: async (parent, _args, { prisma }, _info) => {
        const cvSkills = await prisma.cvSkill.findMany({
            where: { skillId: parent.id },
            include: { cv: true }
        });
        return cvSkills.map(cvSkill => cvSkill.cv);
    }
}