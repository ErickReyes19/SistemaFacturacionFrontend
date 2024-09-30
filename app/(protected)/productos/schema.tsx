import * as z from "zod";

// Esquema para representar un producto existente
export const ProductoElementSchema = z.object({
    productoId: z.string().default(""),
    nombreProducto: z.string().min(1, { message: "El nombre del producto no puede estar vacío" }),
    precioProducto: z.number().positive({ message: "El precio debe ser un número positivo" }),
    descripcion: z.string().min(1, { message: "La descripción no puede estar vacía" }),
    fechaRegistro: z.coerce.date().default(() => new Date()),
    activo: z.boolean().default(true),
    categoriaId: z.string().min(1, { message: "La categoría no puede estar vacía" }),
    categoriaNombre: z.string().default(""),
    stock: z.number().int().nonnegative({ message: "El stock debe ser un número entero no negativo" }),
});
export type ProductoElement = z.infer<typeof ProductoElementSchema>;

// Esquema para crear o actualizar un producto
export const ProductoPostElementSchema = z.object({
    productoId: z.string().default(""),
    nombreProducto: z.string().min(1, { message: "El nombre del producto no puede estar vacío" }),
    precioProducto: z.number()
        .positive({ message: "El precio debe ser un número positivo" }),
    descripcion: z.string().min(1, { message: "La descripción no puede estar vacía" }),
    activo: z.boolean().default(true),
    categoriaId: z.string().min(1, { message: "La categoría no puede estar vacía" }),
    stock: z.number().int().nonnegative({ message: "El stock debe ser un número entero no negativo" }),
});
export type ProductoElementPost = z.infer<typeof ProductoPostElementSchema>;
