import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const needName = searchParams.get('need_name');
  const userId = searchParams.get('user_id');

  try {
    if (!needName || !userId) throw new Error('Need name and user ID are required');
    await sql`INSERT INTO "need_to_ease" (need_name, use_id) VALUES (${needName}, ${userId});`;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
 
  try {
    const needs = await sql`SELECT * FROM "need_to_ease";`;
    return NextResponse.json({ needs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}