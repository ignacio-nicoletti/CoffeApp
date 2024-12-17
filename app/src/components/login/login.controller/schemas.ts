import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email({ message: "Por favor ingresa un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  lastname: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
})
