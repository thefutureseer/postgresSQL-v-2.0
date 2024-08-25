import { sql } from "@vercel/postgres";

export default async function CarRides({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from car_rides where user_id=${params.user}`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.quantity}
        </div>
      ))}
    </div>
  );
}