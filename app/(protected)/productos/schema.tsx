import * as z from "zod";


export const ProductoElementSchema = z.object({
    "nombreProducto": z.string(),
    "precioProducto": z.string(),
    "descripcion": z.string(),
    "categoriaNombre": z.string(),
    "stock": z.string(),
});
export type ProductoElement = z.infer<typeof ProductoElementSchema>;
