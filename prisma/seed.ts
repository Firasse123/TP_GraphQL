import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Nettoyer la base d'abord
  await prisma.cvSkill.deleteMany()
  await prisma.cv.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.user.deleteMany()

  // Créer les Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Aymen',
      email: 'aymen@gmail.com',
      role:"ADMIN"
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Mohamed',
      email: 'mohamed@gmail.com',
      role: "USER"
    }
  })

  // Créer les Skills
  const skill1 = await prisma.skill.create({
    data: { designation: 'JavaScript' }
  })

  const skill2 = await prisma.skill.create({
    data: { designation: 'React' }
  })

  const skill3 = await prisma.skill.create({
    data: { designation: 'Node.js' }
  })

  // Créer les CVs avec leurs relations
  await prisma.cv.create({
    data: {
      name: 'FullStack CV',
      age: 25,
      job: 'Freelancer',
      ownerId: user1.id,
      skills: {
        create: [
          { skillId: skill1.id },
          { skillId: skill2.id }
        ]
      }
    }
  })

  await prisma.cv.create({
    data: {
      name: 'Backend CV',
      age: 30,
      job: 'Developer',
      ownerId: user2.id,
      skills: {
        create: [
          { skillId: skill3.id },
          { skillId: skill1.id }
        ]
      }
    }
  })

  console.log('✅ Base de données peuplée avec succès !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })