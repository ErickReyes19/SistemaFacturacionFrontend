// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { FormRol } from "../components/FormRol";
import { PlusCircle, UserPen } from "lucide-react";
import { getPermisosActivos } from "../../actions";

export default async function Create() {
    const permisos = await getPermisosActivos()
    return (
        <div>
        <HeaderComponent Icon={UserPen} description="En este apartado podrá crear una rol" screenName="Roles" />
        <FormRol permisos={permisos}></FormRol>
        </div>
    );
}
