import * as z from "zod";


export const CategoriaElementSchema = z.object({
    "categoriaId": z.string().default(""),
    "nombre": z.string(),
    "descripcion": z.string(),
    "fechaCreacion": z.coerce.date().default(()=> new Date()),
    "activo": z.boolean().default(true),
});
export type CategoriaElement = z.infer<typeof CategoriaElementSchema>;
