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
        name: 'John Doe',
        email: 'john@example.com',
        phonenumber: '1234567890',
        address: '123 Main St',
        profilepicture: 'profile.jpg',
        rating: 4.5,
        role: 'user',
        preferences: {},
        tags: ['new', 'active'],
        createdat: new Date(),
        updated: new Date(),
        password: hashedPassword,  
      },
      {
        name: 'John Voe',
        email: 'john.voe@example.com',
        phonenumber: '1234567890',
        address: '456 Elm St',
        profilepicture: 'john_voe_profile.jpg',
        role: 'user',  
        rating: 4.2,
        preferences: JSON.stringify({ theme: 'dark', notifications: true }),
        tags: ['new', 'premium'],
        createdat: new Date(),
        updated: new Date(),
        interactions: JSON.stringify({ lastLogin: new Date(), actions: ['login', 'update_profile'] }),
        password: hashedPassword,
        // You may need to handle relationships separately
        // orders: [],
        // pastexperiences: [],
      },
      {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phonenumber: '0987654321',
      address: '789 Pine St',
      profilepicture: 'jane_smith_profile.jpg',
      role: 'user',  // Ensure the role matches one of your enum values
      rating: 4.8,
      preferences: JSON.stringify({ theme: 'light', notifications: false }),
      tags: ['returning'],
      createdat: new Date(),
      updated: new Date(),
      interactions: JSON.stringify({ lastLogin: new Date(), actions: ['login'] }),
      password: hashedPassword, // Add the hashed password here
    },
    { name: 'Alice Johnson', email: 'alicejohnson@example.com',password: hashedPassword, phonenumber: '2345678901' },
    { name: 'Bob Brown', email: 'bobbrown@example.com',password: hashedPassword, phonenumber: '3456789012' },
    { name: 'Charlie Davis', email: 'charliedavis@example.com',password: hashedPassword, phonenumber: '4567890123' },
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