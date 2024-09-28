import { redirect } from "next/navigation";
import { getClienteById } from "../../actions";
import { FormEditCliente } from "./components/FormEditCliente";
import HeaderComponent from "@/components/HeaderComponent";
import { Edit, Package, UserPen } from "lucide-react";

export default async function Home({
    params,
}: {
    params: { id: string };
}) {
    const responseCliente = await getClienteById( params.id);
    if(responseCliente === null){
        redirect("/clientes")
    }
    return (
        <main className="w-full">
            <HeaderComponent Icon={UserPen} description="En este apartado podrá editar o desactivar un cliente" screenName="Clientes" />
            <FormEditCliente cliente={responseCliente} />

        </main>
    );
}

