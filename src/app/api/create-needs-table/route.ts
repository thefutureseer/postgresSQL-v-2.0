import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS need_to_ease (
        id SERIAL PRIMARY KEY,
        need_name VARCHAR(255),
        user_id INTEGER,
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id)
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('Error creating table:', error);
    return NextResponse.json({ error: 'Failed to create table' }, { status: 500 });
  }
};