import fs from "node:fs";
import path from "node:path";
import __dirname from "../dirname.js";
import db, { chat, item, message, order, product, role, user } from "../index.js";
// Importa tus modelos de drizzle aquí

async function backupDb() {
  console.time("Terminé de hacer backup de los modelos");

  let allModels = {
    user,
    chat,
    item,
    message,
    order,
    product,
    role,
  };

  // Iterate over the entries (key-value pairs) of the allModels object
  for (const [modelName, model] of Object.entries(allModels)) {
    try {
      // Fetch all records for the current table
      const data: any = await db.select().from(model);

      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          // Eliminar timestamps que no son necesarios en el backup
          delete data[i].createdAt;
          delete data[i].updatedAt;
        }
      }

      // Define a file path for the backup JSON file
      const backupPath = path.join(__dirname, "backups/exports", `${modelName}.json`);

      // Ensure the backups directory exists
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });

      // Write the data to a JSON file
      fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));

      console.log(`Backup for ${modelName} completed successfully.`);
    } catch (error) {
      console.error(`Error backing up ${modelName}:`, error);
    }
  }

  console.timeEnd("Terminé de hacer backup de los modelos");
  process.exit();
}

backupDb().catch(console.error);
