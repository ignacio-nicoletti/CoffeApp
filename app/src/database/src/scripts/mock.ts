import fs from "node:fs";
import path from "node:path";
import __dirname from "../dirname.js";
import { role } from "../schema.js";
import statusOrder from "../schemas/statusOrder.js";
import db from "../index.js";
import optionMenu from "../schemas/optionsMenu.js";
// // Importa tus tablas (equivalente a los modelos de Prisma)

type DrizzleModels = {
  [key in "role" | "statusOrder" | "optionMenu"]: any; // Aquí puedes usar la tabla directamente
};

// // Función para eliminar registros si la tabla no está vacía
async function deleteIfNotEmpty(table: any) {
  try {
    const rows = await db.select().from(table).limit(1);
    if (rows.length > 0) {
      console.log(`Eliminando datos de la tabla ${table[Symbol.for("drizzle:name")]}...`);
      await db.delete(table);
      console.log(
        `Se han eliminado los registros de la tabla ${table[Symbol.for("drizzle:name")]}`
      );
    } else {
      console.log(`La tabla ${table[Symbol.for("drizzle:name")]} ya está vacía.`);
    }
  } catch (error) {
    console.error(
      `Error al eliminar datos de la tabla ${table[Symbol.for("drizzle:name")]}:`,
      error
    );
  }
}

// // Función para eliminar datos de todas las tablas en orden
async function eliminarDatos() {
  // Lista de tablas en el orden adecuado (considerando las relaciones)
  const tables = [
    // Tablas que dependen de otras (hijas) se eliminan primero

    role,
    statusOrder,
    optionMenu,
  ];

  for (const table of tables) {
    await deleteIfNotEmpty(table);
  }
}

// // Función para insertar datos en un modelo específico
async function seedModel(modelName: keyof DrizzleModels, backupDir: string) {
  // Obtener la tabla de Drizzle correspondiente
  const model = {
    role,
    statusOrder,
    optionMenu,
  }[modelName];

  if (!model) {
    console.error(`Modelo ${modelName} no encontrado en Drizzle.`);
    return;
  }

  try {
    const dataFile = path.join(backupDir, `${modelName}.json`);
    const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));

    if (data && data.length > 0) {
      // Inserta los datos utilizando Drizzle
      await db.insert(model).values(data).onConflictDoNothing();
      console.log(`Datos para ${modelName} se han insertado correctamente.`);
    }
  } catch (error) {
    console.error(`Error al procesar ${modelName}:`, error);
  }
}

// Función principal para ejecutar el seeding
export default async function seedDatabaseMocks() {
  const backupDir = path.join(__dirname, "backups/exports");

  console.time("Terminé de subir los mocks");

  // Primero, eliminar los datos de todas las tablas
  await eliminarDatos();

  // Lista de modelos en el orden adecuado
  const models: (keyof DrizzleModels)[] = ["role", "statusOrder", "optionMenu"];

  // Insertar datos para cada modelo
  for (const model of models) {
    await seedModel(model, backupDir);
  }

  console.timeEnd("Terminé de subir los mocks");
}
