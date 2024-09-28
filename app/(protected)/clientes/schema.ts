import * as z from "zod";


export const ClienteElementSchema = z.object({
    "clienteId": z.string().default(""),
    "identidad": z.string(),
    "nombre": z.string(),
    "apellido": z.string(),
    "correo": z.string(),
    "telefono": z.string(),
    "direccion": z.string(),
    "activo": z.boolean().default(true),
    "fechaRegistro": z.coerce.date().default(() => new Date()),
});
export type ClienteElement = z.infer<typeof ClienteElementSchema>;
