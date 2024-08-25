import { PrismaClient, User, CarRides } from '@prisma/client';

const prisma = new PrismaClient();

async function test(): Promise<void> {
  try {
    const users: User[] = await prisma.user.findMany();
    console.log('Users:', users);
    
    const carRides: CarRides[] = await prisma.carRides.findMany();
    console.log('CarRides:', carRides);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();