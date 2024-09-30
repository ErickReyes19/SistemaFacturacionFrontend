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
    categoriaNombre:string;
    stock:          string;
}

export type Cliente = {
    clienteId:      string;
    nombre?:        string;
    identidad?:     string;
    apellido?:      string;
    correo?:        string;
    telefono?:      string;
    direccion?:     string;
    activo:         boolean;
    fechaRegistro:  Date;
}

export type Rol = {
    rolId:         string;
    nombre:        string;
    descripcion:   string;
    fechaCreacion: Date;
    activo:        boolean;
    permisosIds:   string[];
}

export type Permiso = {
    permisoId:     string;
    nombre:        string;
    fechaCreacion: Date;
    activo:        boolean;
}

export type RolPermisos = {
    RolId:       string;
    PermisosIds: string[];
}

export type UsuarioPost = {
    usuarioId:     string;
    nombre:        string;
    correo:        string;
    contrasena:    string;
    rolId:         string;
    fechaCreacion: Date;
    activo:        boolean;
}


export type Usuario = {
    usuarioId:     string;
    nombre:        string;
    correo:        string;
    fechaCreacion: Date;
    activo:        boolean;
    rolUsuario:    RolUsuario;
}

export type RolUsuario = {
    rolId:  string;
    nombre: string;
}











