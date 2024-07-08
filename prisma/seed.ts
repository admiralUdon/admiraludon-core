// import { PrismaClient } from '@prisma/client';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const prisma = new PrismaClient();

// async function main() {
//   // Delete all data first to start with a clean slate
//   await prisma.userSkill.deleteMany({});
//   await prisma.user.deleteMany({});
//   await prisma.skill.deleteMany({});

//   // Create skills
//   const adminSkill = await prisma.skill.create({
//     data: {
//       tag: 'admin',
//       title: 'Administrator',
//     },
//   });

//   const userSkill = await prisma.skill.create({
//     data: {
//       tag: 'user',
//       title: 'User',
//     },
//   });

//   // Create users
//   const john = await prisma.user.create({
//     data: {
//       username: 'john.doe@example.com',
//       name: 'John Doe',
//       password: 'password',
//       avatar: 'https://example.com/avatar1.png',
//     },
//   });

//   const admin = await prisma.user.create({
//     data: {
//       username: 'admin@example.com',
//       name: 'Administrator',
//       password: 'password',
//       avatar: 'https://example.com/avatar2.png',
//     },
//   });

//   // Create user-skill relationships
//   await prisma.userSkill.create({
//     data: {
//       userId: john.id,
//       skillId: userSkill.id,
//     },
//   });

//   await prisma.userSkill.create({
//     data: {
//       userId: admin.id,
//       skillId: adminSkill.id,
//     },
//   });

//   await prisma.userSkill.create({
//     data: {
//       userId: admin.id,
//       skillId: userSkill.id,
//     },
//   });

//   console.log({ john, admin, adminSkill, userSkill });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });