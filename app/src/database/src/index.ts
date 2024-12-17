export * from "./schemas";
import * as schema from "./schemas";
export * from "drizzle-orm";
import * as dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/node-postgres";
// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL!,

    //! SOLO PARA PROD
    // ssl: true
  },
  schema: schema,
});

export default db;
