import { sql } from "@vercel/postgres";

export default async function Cart({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from "user"`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} 
          <p>Name: {row.name}</p>
          <p>Email: {row.email}</p>
        </div>
      ))}
    </div>
  );
};