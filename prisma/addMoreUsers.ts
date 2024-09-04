import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});


// Define password for seeding
const password = 'your_password';
const saltRounds = 10;

// Hash the password
const hashedPassword = bcrypt.hashSync(password, saltRounds);

async function main() {
  // Seed users
  await prisma.user.createMany({
    data: [
      {
        name: 'Emma White',
        email: 'emma.white@example.com',
        phonenumber: '555-1122',
        address: '852 Willow St',
        profilepicture: 'emma_white_profile.jpg',
        role: 'user',
        rating: 4.2,
        preferences: JSON.stringify({ theme: 'dark', notifications: true }),
        tags: ['active', 'featured'],
        createdat: new Date(),
        updated: new Date(),
        interactions: JSON.stringify({ lastLogin: new Date(), actions: ['login', 'share'] }),
        password: hashedPassword,
      },
      {
        name: 'Oliver Green',
        email: 'oliver.green@example.com',
        phonenumber: '555-3344',
        address: '741 Cedar St',
        profilepicture: 'oliver_green_profile.jpg',
        role: 'user',
        rating: 4.8,
        preferences: JSON.stringify({ theme: 'light', notifications: true }),
        tags: ['premium', 'active'],
        createdat: new Date(),
        updated: new Date(),
        interactions: JSON.stringify({ lastLogin: new Date(), actions: ['login', 'comment', 'like'] }),
        password: hashedPassword,
      },
      {
        name: 'Sophia Brown',
        email: 'sophia.brown@example.com',
        phonenumber: '555-5566',
        address: '159 Maple Ave',
        profilepicture: 'sophia_brown_profile.jpg',
        role: 'user',
        rating: 4.6,
        preferences: JSON.stringify({ theme: 'dark', notifications: false }),
        tags: ['featured', 'new'],
        createdat: new Date(),
        updated: new Date(),
        interactions: JSON.stringify({ lastLogin: new Date(), actions: ['login', 'purchase'] }),
        password: hashedPassword,
      },
    ],
    skipDuplicates: true,
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