"use server";

import { type TSchemaSignIn, schemaSignIn } from "./lib/shemas";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const key = new TextEncoder().encode(process.env.AUTH_SECRET);
interface UsuarioSesion {
    userId: string;
    Usuario: string;
    permisos: string[]; 
    exp: number;
}
export async function encrypt(payload: JWTPayload | undefined) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1 h from now")
        .sign(key);
}
export const decrypt = async (input: string): Promise<UsuarioSesion> => {
    console.log("🚀 ~ decrypt ~ input:", input);
    const { payload } = await jwtVerify<JWTPayload>(input, key, { algorithms: ["HS256"] });
    console.log("🚀 ~ decrypt ~ payload:", payload);

    const usuarioSesion: UsuarioSesion = {
        userId: payload.userId as string,
        Usuario: payload.Usuario as string,
        permisos: payload.permisos as string[] || [],
        exp: payload.exp as number,
    };

    return usuarioSesion;
};
export const login = async (credentials: TSchemaSignIn) => {
    const validated = schemaSignIn.safeParse(credentials);
    if (!validated.success) {
        return { error: "Usuario o contraseña invalidos" };
    }
    try {
        const { username, password } = validated.data;
        const tokenAD = await getADAuthentication(username, password);
        if (!tokenAD) {
            return { error: "Usuario o contraseña invalidos" };
        }
        // const roles = await getNivelesAcceso();
        // if (!roles) {
        //     return { error: "Usuario no autorizado" };
        // }
        const decryptedToken = await decrypt(tokenAD);
        console.log("🚀 ~ login ~ decryptedToken:", decryptedToken)
        // const employeeNumber = decryptedToken.employeeNumber as string;

        const session = tokenAD;
        console.log("🚀 ~ login ~ session:", session)
        const expires = new Date(((await decrypt(session)).exp as number) * 1000);
        cookies().set("session", session, { expires, httpOnly: true });
        return { success: "Login OK" };
    } catch (error) {
        console.log(error);
        return { error: "Error al iniciar sesion" };
    }
};
export const getSession = async () => {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }
    return await decrypt(session);
};
export const getSessionUsuario = async (): Promise<UsuarioSesion | null> => {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }
    const usuario = await decrypt(session);
    return usuario; 
};

export const getSessionPermisos = async (): Promise<string[] | null> => {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }
    const usuario = await decrypt(session);
    return usuario.permisos; // Esto ahora debería ser correcto
};

// export const getEmpleadoSession = async () => {
//     const empleado = cookies().get("employee")?.value;
//     if (!empleado) {
//         return null;
//     }
// };
type TRolAcceso = {
    id: string;
    nivelAcceso: number;
    descripcion: string;
    grupos: string;
    esquema: string;
    tagServicio: string;
};
// const getNivelesAcceso = async () => {
//     const url = `${process.env.API_COMMON_AUTHENTICATION}/v1/ldap/roles/servicio/app_estado_cuenta`;
//     const response = await fetch(url, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//     });
//     if (!response.ok) {
//         return null;
//     }
//     const data = await response.json();
//     console.log(JSON.stringify(data));
//     chunkCookie({ name: "roles", value: JSON.stringify(data), size: 2000 });
//     return data;
// };
const chunkCookie = ({ name, value, size }: { name: string; value: string; size: number }) => {
    const chunks = Math.ceil(value.length / size);
    for (let i = 0; i < chunks; i++) {
        const chunkValue = value.slice(i * size, (i + 1) * size);
        cookies().set(`${name}Chunk${i}`, chunkValue);
    }
};
const getADAuthentication = async (correo: string, contrasena: string) => {
    console.log(correo)
    console.log(contrasena)
    const url = `${process.env.URL}`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
    });
    if (!response.ok) {
        return null;
    }
    const { token } = await response.json();
    console.log(token)
    return token;
};
// export const logout = () => {
//     cookies().set("session", "", { expires: new Date(0), httpOnly: true });
//     cookies().set("employee", "", { expires: new Date(0), httpOnly: true });
//     deleteChuck("roles");
// };

// const deleteChuck = (name: string) => {
//     let i = 0;
//     while (true) {
//         const chunk = cookies().get(`${name}Chunk${i}`);
//         if (!chunk) {
//             break;
//         }
//         cookies().delete(chunk.name);
//         i++;
//     }
// };
export const getToken = async () => {
    const token = cookies().get("session")?.value;
    return token as string;
};


