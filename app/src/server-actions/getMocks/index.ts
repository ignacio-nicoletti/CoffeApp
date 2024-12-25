"use server";

import db from "../../database/src";

export async function getMockData() {
  const rolesTypes = await db.query.role.findMany({
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  });

  const optionMenuTypes = await db.query.optionMenu.findMany({
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  });
  const statusOrderTypes = await db.query.statusOrder.findMany({
    columns: {
      createdAt: false,
      updatedAt: false,
    },
  });

  if (rolesTypes.length > 0 && optionMenuTypes.length > 0 && statusOrderTypes.length > 0) {
    return {
      rolesTypes,
      optionMenuTypes,
      statusOrderTypes,
    };
  } else {
    throw Error("Solicitud: Error al traer información de la db");
  }
}

export type MockData = Awaited<ReturnType<typeof getMockData>>;
