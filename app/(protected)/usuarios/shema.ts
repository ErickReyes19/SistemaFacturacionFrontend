import * as z from "zod";


export const RolUsuarioSchema = z.object({
    "rolId": z.string(),
    "nombre": z.string(),
});
export type RolUsuario = z.infer<typeof RolUsuarioSchema>;

export const UsuarioSchema = z.object({
    "usuarioId": z.string(),
    "nombre": z.string(),
    "correo": z.string(),
    "fechaCreacion": z.coerce.date(),
    "activo": z.boolean(),
    "rolUsuario": RolUsuarioSchema,
});
export type Usuario = z.infer<typeof UsuarioSchema>;

export const UsuarioPostSchema = z
  .object({
    usuarioId: z.string().default(""),
    nombre: z.string().nonempty("El nombre es obligatorio."),
    correo: z.string().email("El correo debe ser válido.").nonempty("El correo es obligatorio."),
    contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres.").nonempty("La contraseña es obligatoria."),
    confirmarContrasena: z.string().nonempty("La confirmación de contraseña es obligatoria."),
    fechaCreacion: z.coerce.date().default(() => new Date()),
    activo: z.boolean().default(true),
    rolId: z.string().nonempty("El rol es obligatorio."),
  })
  .refine((data) => data.contrasena === data.confirmarContrasena, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarContrasena"], // Campo que mostrará el mensaje de error
  });

export type UsuarioPost = z.infer<typeof UsuarioPostSchema>;

