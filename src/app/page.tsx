import { sql } from "@vercel/postgres";

export default async function HomePage() {
  try {
    const { rows } = await sql`SELECT * FROM "user"`;
    
    return (
      <div>
        {rows.map((row) => (
          <div key={row.id}>
            <p>ID: {row.id}</p>
            <p>Name: {row.name}</p>
            <p>Email: {row.email}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return <div>Error loading data.</div>;
  }
}