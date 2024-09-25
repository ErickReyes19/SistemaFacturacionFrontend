
import { z } from "zod";

export const schemaSignIn = z.object({
    username: z
        .string({ message: "El nombre de usuario es requerido" })
        .min(1, { message: "El nombre de usuario es requerido" }),
    password: z
        .string({ message: "La contrasenÞa es requerida" })
        .min(1, { message: "La contrasenÞa es requerida" }),
});
export type TSchemaSignIn = z.infer<typeof schemaSignIn>;