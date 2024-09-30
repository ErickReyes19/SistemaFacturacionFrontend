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

export type UsuarioPost = {
    usuarioId:     string;
    nombre:        string;
    correo:        string;
    contrasena:    string;
    rolId:         string;
    fechaCreacion: Date;
    activo:        boolean;
}
