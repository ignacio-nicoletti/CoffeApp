import { NextResponse, NextRequest } from "next/server";
import db, { eq, role, user } from "../../src/database/src";
import { encrypt } from "../../src/utils/encrypt";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    console.log("Datos recibidos:", data);

    // Verificar si el email ya existe
    const userFound = await db.query.user.findFirst({
      where: eq(user.email, data.email),
    });

    if (userFound) {
      return NextResponse.json("Este email está registrado", { status: 400 });
    }

    // Buscar rol por defecto
    const roleId = 1;
    const roleFound = await db.query.role.findFirst({
      where: eq(role.id, roleId),
    });

    if (!roleFound) {
      return NextResponse.json(
        "Rol por defecto no encontrado, contacte al administrador.",
        { status: 400 }
      );
    }

    // Encriptar la contraseña
    const hashedPassword = await encrypt(data.password);

    // Crear usuario
    const [newUser] = await db
      .insert(user)
      .values({
        email: data.email,
        name: data.name,
        lastname: data.lastname,
        password: hashedPassword,
        roleId: roleId,
      })
      .returning();

    if (!newUser?.id) {
      throw new Error("Error al crear el usuario");
    }

    // Excluir la contraseña de la respuesta
    const { password, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    console.error("Error en el endpoint de registro:", error.message);
    return NextResponse.json(
      { message: "Ocurrió un error inesperado" },
      { status: 500 }
    );
  }
}
