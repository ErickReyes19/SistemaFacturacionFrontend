// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import {  UserPen } from "lucide-react";
import { FormUsuario } from "../components/formUsuarios";
import { getRoles, getRolesActivos } from "../../rolespermisos/actions";


export default async function Create() {
    const roles = await getRolesActivos()
    return (
        <div>
        <HeaderComponent Icon={UserPen} description="En este apartado podrá crear una rol" screenName="Roles" />
        <FormUsuario roles={roles}></FormUsuario>
        </div>
    );
}
