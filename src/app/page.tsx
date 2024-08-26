// import { sql } from "@vercel/postgres";

// export default async function HomePage() {
//   const { rows } = await sql`SELECT * FROM car_rides`;

//   return (
//     <div>
//       <h1>Car Rides</h1>
//       {rows.length > 0 ? (
//         rows.map((row) => (
//           <div key={row.id}>
//             <p>ID: {row.id}</p>
//             <p>Quantity: {row.quantity}</p>
//           </div>
//         ))
//       ) : (
//         <p>No car rides found.</p>
//       )}
//     </div>
//   );
// };