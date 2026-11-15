import { neon } from "@neondatabase/serverless";

export default async function Home() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT now()`;
  return <p>DBの時刻：{String(rows[0].now)}</p>;
}
