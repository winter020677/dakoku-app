import { neon } from "@neondatabase/serverless";
import LoginButton from "./login-button";

export default async function Home() {
  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql`SELECT now()`;
  return (
    <main>
      <p>DBの時刻：{String(rows[0].now)}</p>
      <LoginButton />
    </main>
  );
}
