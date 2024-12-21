import { z } from "zod";

// Regex para control de inputs con caracteres especiales
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
const passwordRegex = /^.{8,}$/;

export const LoginFormSchema = z.object({
  email: z.string().regex(emailRegex, { message: "El email debe ser válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  // password: z
  //   .string()
  //   .regex(passwordRegex, { message: "La contraseña debe tener al menos 8 caracteres, incluyendo como mínimo una mayúscula, una minúscula, un número y un símbolo especial." }),
});

export const registerSchema = LoginFormSchema.extend({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  lastname: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
});
