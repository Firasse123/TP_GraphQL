export const ensureUserExists = async (prisma, userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }

    return user;
};

export const ensureSkillExists = async (prisma, skillId) => {
    const skill = await prisma.skill.findUnique({
        where: { id: skillId }
    });

    if (!skill) {
        throw new Error(`Skill with id ${skillId} not found`);
    }

    return skill;
};

export const ensureSkillsExist = async (prisma, skillsIds = []) => {
    for (const skillId of skillsIds) {
        await ensureSkillExists(prisma, skillId);
    }
};