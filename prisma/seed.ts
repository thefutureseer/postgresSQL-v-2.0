import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com', password: 'password123' },
      { name: 'Bob', email: 'bob@example.com', password: 'password456' },
      { name: 'Charlie', email: 'charlie@example.com', password: 'password789' },
    ],
  });

  // Create CarRides
  await prisma.carRides.createMany({
    data: [
      { needs: 'The Father', quantity: 1 },
      { needs: 'The son', quantity: 2 },
      { needs: 'The holy spirit', quantity: 5 },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
