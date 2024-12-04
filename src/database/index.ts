import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const isDev = process.env.NODE_ENV === "development";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isDev,
});

export const db = drizzle({ client: pool, schema });

// const result = await db.execute("select version()");
