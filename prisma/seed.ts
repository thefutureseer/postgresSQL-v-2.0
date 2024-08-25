import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    console.log('Creating users...');
    const users = await prisma.user.createMany({
      data: [
        { name: 'Alice', email: 'alice@example.com', password: 'password123' },
        { name: 'Bob', email: 'bob@example.com', password: 'password456' },
        { name: 'Charlie', email: 'charlie@example.com', password: 'password789' },
      ],
      skipDuplicates: true,
    });
    console.log('Users created successfully:', users);
  } catch (e) {
    console.error('Error creating users:', e);
  }

  try {
    console.log('Creating needs...');
    const needs = await prisma.needToEase.createMany({
      data: [
        { needName: 'Need 1', owner: 'Owner 1', userId: 1 },
        { needName: 'Need 2', owner: 'Owner 2', userId: 2 },
        { needName: 'Need 3', owner: 'Owner 3', userId: 3 },
      ],
      skipDuplicates: true,
    });
    console.log('Needs created successfully:', needs);
  } catch (e) {
    console.error('Error creating needs:', e);
  }

  try {
    console.log('Creating car rides...');
    const carRides = await prisma.carRides.createMany({
      data: [
        { needs: 'The Father', quantity: 1, needId: 1, userId: 1 },
        { needs: 'The Son', quantity: 2, needId: 2, userId: 2 },
        { needs: 'Holy Spirit', quantity: 3, needId: 3, userId: 3 },
      ],
      skipDuplicates: true,
    });
    console.log('Car rides created successfully:', carRides);
  } catch (e) {
    console.error('Error creating car rides:', e);
  }
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });