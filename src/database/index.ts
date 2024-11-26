import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const isDev = process.env.NODE_ENV === "development";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isDev,
});

export const db = drizzle({ client: pool });

// const result = await db.execute("select version()");
