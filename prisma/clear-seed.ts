import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres';

const prisma = new PrismaClient();

async function clearData() {
  try {
    console.log('Deleting records from car rides...');
    await prisma.car_rides.deleteMany();
    console.log('Car rides records deleted successfully');

    console.log('Deleting records from needs...');
    await prisma.need_to_ease.deleteMany();
    console.log('Needs records deleted successfully');

    console.log('Deleting records from users...');
    await prisma.user.deleteMany();
    console.log('Users records deleted successfully');

    // Drop tables using raw SQL commands
    console.log('Dropping tables...');
    await sql`DROP TABLE IF EXISTS car_rides CASCADE;`;
    await sql`DROP TABLE IF EXISTS need_to_ease CASCADE;`;
    await sql`DROP TABLE IF EXISTS "user" CASCADE;`;
    console.log('Tables dropped successfully');

  } catch (e) {
    console.error('Error during clearing data:', e);
  } finally {
    await prisma.$disconnect();
  }
}

clearData()
  .catch(e => {
    console.error('Error during clearing data:', e);
    process.exit(1);
  });