import * as z from "zod";


export const PermisoElementSchema = z.object({
    "permisoId": z.string().default(""),
    "nombre": z.string(),
    "fechaCreacion": z.coerce.date().default(()=> new Date()),
    "activo": z.boolean().default(true),
});
export type PermisoElement = z.infer<typeof PermisoElementSchema>;
