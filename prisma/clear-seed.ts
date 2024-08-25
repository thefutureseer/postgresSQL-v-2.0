import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearData() {
  try {
    console.log('Deleting car rides...');
    await prisma.carRides.deleteMany();
    console.log('Car rides deleted successfully');

    console.log('Deleting needs...');
    await prisma.needToEase.deleteMany();
    console.log('Needs deleted successfully');

    console.log('Deleting users...');
    await prisma.user.deleteMany();
    console.log('Users deleted successfully');
  } catch (e) {
    console.error('Error deleting data:', e);
  } finally {
    await prisma.$disconnect();
  }
}

clearData()
  .catch(e => {
    console.error('Error during clearing data:', e);
    process.exit(1);
  });