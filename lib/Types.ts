export type Categoria = {
    categoriaId:   string;
    nombre:        string;
    descripcion:   string;
    fechaCreacion: Date;
    activo:        boolean;
}

export type Producto = {
    productoId:     string;
    nombreProducto: string;
    precioProducto: string;
    descripcion:    string;
    fechaRegistro:  Date;
    activo:         boolean;
    categoriaNombre:    string;
}

