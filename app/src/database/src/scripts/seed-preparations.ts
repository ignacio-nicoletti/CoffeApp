import __dirname from "../dirname";
import fs from "node:fs";
import path from "node:path";

// Importar el objeto de conexión de Drizzle

import db, { chat, item, message, order, product, user } from "../index";

const errorDir = path.join(__dirname, "backups", "errors", "errors.txt");
const errors: any[] = [];

async function seedDatabase() {
  const backupDir = path.join(__dirname, "backups/exports");

  console.time("Terminé de subir los seeders");

  try {
    //! Orden de inserción, revisar cada vez que se modifiquen o creen modelos.
    const entities = [
      { name: "chat", model: chat },
      { name: "item", model: item },
      { name: "message", model: message },
      { name: "order", model: order },
      { name: "product", model: product },
      { name: "user", model: user },
    ];

    for (const entity of entities) {
      console.log(`Subiendo ${entity.name}`);
      const data = JSON.parse(fs.readFileSync(`${backupDir}/${entity.name}.json`, "utf8"));
      if (data && data.length > 0) {
        await db.delete(entity.model);
        await db.insert(entity.model).values(data).onConflictDoNothing();
      }
    }

    console.log("Terminé de subir los seeders");
  } catch (error) {
    console.error("Error al subir los seeders:", error);
    errors.push(error);
    fs.writeFileSync(errorDir, JSON.stringify(errors, null, 2), "utf-8");
  } finally {
    console.timeEnd("Terminé de subir los seeders");
  }
}

export default seedDatabase;
