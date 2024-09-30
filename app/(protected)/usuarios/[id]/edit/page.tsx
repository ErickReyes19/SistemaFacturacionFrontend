// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import {  UserPen } from "lucide-react";
import { getRolesActivos } from "@/app/(protected)/rolespermisos/actions";
import { FormEditUsuario } from "./components/components/FormEditsuarios";
import { getUsuarioById } from "../../actions";
import { redirect } from "next/navigation";


export default async function Create({
    params,
}: {
    params: { id: string };
}) {
    const roles = await getRolesActivos()
    const usuario = await getUsuarioById(params.id);
    if(usuario === null){
        redirect("/usuarios")
    }
    return (
        <div>
        <HeaderComponent Icon={UserPen} description="En este apartado podrá editar una usuario" screenName="Usuario" />
        <FormEditUsuario roles={roles} usuario={usuario}  ></FormEditUsuario>
        </div>
    );
}
