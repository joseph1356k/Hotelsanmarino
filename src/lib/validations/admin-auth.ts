import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.email("Ingresa un correo válido."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
