import * as z from "zod";

export const CategoriaElementSchema = z.object({
    "nombre": z.string(),
    "descripcion": z.string(),
});


export type CategoriaElement = z.infer<typeof CategoriaElementSchema>;
