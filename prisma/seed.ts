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
    const needs = await prisma.need_to_ease.createMany({
      data: [
        { need_name: 'Need 1', user_id: 1 },
        { need_name: 'Need 2', user_id: 2 },
        { need_name: 'Need 3', user_id: 3 },
      ],
      skipDuplicates: true,
    });
    console.log('Needs created successfully:', needs);
  } catch (e) {
    console.error('Error creating needs:', e);
  }

  try {
    console.log('Creating car rides...');
    const carRides = await prisma.car_rides.createMany({
      data: [
        { needs: 'The Father', quantity: 1, need_id: 1, user_id: 1 },
        { needs: 'The Son', quantity: 2, need_id: 2, user_id: 2 },
        { needs: 'The holy Spirit', quantity: 3, need_id: 3, user_id: 3 },
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