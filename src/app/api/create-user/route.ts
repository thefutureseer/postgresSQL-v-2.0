import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { CreateUserRequest } from '@/types'; // Import from the types folder

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json() as CreateUserRequest;

    const { name, email, password } = data;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required in order to proceed' }, { status: 400 });
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // Note: In a real application, make sure to hash passwords before storing them
      },
    });

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}