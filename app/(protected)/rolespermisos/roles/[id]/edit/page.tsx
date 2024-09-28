import { redirect } from "next/navigation";

import HeaderComponent from "@/components/HeaderComponent";
import { Edit } from "lucide-react";
import { getRolById } from "../../../actions";
import { FormEditRol } from "./components/FormEditRol";

export default async function Home({
    params,
}: {
    params: { id: string };
}) {
    const responseRol = await getRolById( params.id);
    if(responseRol === null){
        redirect("/rolespermiso/roles")
    }
    return (
        <main className="w-full">
            <HeaderComponent Icon={Edit} description="En este apartado podrá editar o desactivar un rol" screenName="Roles" />
            <FormEditRol rol={responseRol} />

        </main>
    );
}

