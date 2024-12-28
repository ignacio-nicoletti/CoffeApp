import seedDatabaseMocks from "./mock";
import seedDatabase from "./seed-preparations";

async function main() {
  try {
    console.log("Subiendo mocks...");
    await seedDatabaseMocks(); // Ejecuta los mocks con la instancia de Drizzle

    // console.log("Subiendo seeders...");
    await seedDatabase(); // Ejecuta los seeders con la instancia de Drizzle

    process.exit(0); // Cierra el proceso exitosamente
  } catch (error) {
    console.error("Error en el proceso de seeding:", error);
    process.exit(1); // Cierra el proceso con error
  } finally {
    console.log("Finalicé");
    
  }
}

main();