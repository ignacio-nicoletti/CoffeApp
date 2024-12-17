import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  // Apunta al directorio donde están tus esquemas, no al archivo `index.ts`
  schema: "./app/src/database/src/schemas",  // Cambia a la carpeta de esquemas
    //! borrar db
  // schema: "./app/src/database/src/schema.delete.ts",

  dialect: "postgresql",  // Dialecto para PostgreSQL
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,  // Conexión con la base de datos
  },
  verbose: true,  // Modo detallado (útil para depuración)
  strict: true,  // Verificación estricta de los esquemas
  out: "./drizzle",  // Carpeta de salida para las migraciones
});
