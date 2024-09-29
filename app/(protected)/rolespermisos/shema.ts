import * as z from "zod";


export const RoleSchema = z.object({
    "rolId": z.string().default(""),
    "nombre": z.string(),
    "descripcion": z.string(),
    "fechaCreacion": z.coerce.date().default(()=> new Date()),
    "activo": z.boolean().default(true),
    "permisosIds": z.array(z.string()).default([]),
});
export type Role = z.infer<typeof RoleSchema>;
