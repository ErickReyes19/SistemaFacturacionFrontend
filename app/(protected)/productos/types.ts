export type Producto = {
    productoId:      string;
    nombreProducto:  string;
    precioProducto:  number;
    descripcion:     string;
    fechaRegistro:   Date;
    activo:          boolean;
    categoriaId:     string;
    categoriaNombre: string;
    stock:           number;
}
export type ProductoPost = {
    productoId: string;
    nombreProducto: string;
    precioProducto: string;  
    descripcion: string;
    activo: boolean;
    categoriaId: string;
    stock: string;          
};