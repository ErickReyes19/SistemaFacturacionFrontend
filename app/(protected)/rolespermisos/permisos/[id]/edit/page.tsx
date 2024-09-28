import { redirect } from "next/navigation";

import HeaderComponent from "@/components/HeaderComponent";
import { Edit } from "lucide-react";
import { getPermisoById } from "../../../actions";
import { FormEditPermiso } from "./components/FormEditPermiso";

export default async function Home({
    params,
}: {
    params: { id: string };
}) {
    const responsePermiso = await getPermisoById( params.id);
    if(responsePermiso === null){
        redirect("/rolespermiso/permisos")
    }
    return (
        <main className="w-full">
            <HeaderComponent Icon={Edit} description="En este apartado podrá editar o desactivar un permiso" screenName="Roles" />
            <FormEditPermiso permiso={responsePermiso} />

        </main>
    );
}

