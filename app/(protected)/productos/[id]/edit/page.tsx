import { redirect } from "next/navigation";
import { getProductoById } from "../../actions";
import { FormEditProducto } from "./components/FormEditProducto";
import HeaderComponent from "@/components/HeaderComponent";
import { Edit, Package } from "lucide-react";
import { getCategoriasActivas } from "@/app/(protected)/categorias/actions";

export default async function Home({
    params,
}: {
    params: { id: string };
}) {
    const responseProducto = await getProductoById( params.id);
    const categorias = await getCategoriasActivas()
    if(responseProducto === null){
        redirect("/productos")
    }
    return (
        <main className="w-full">
            <HeaderComponent Icon={Package} description="En este apartado podrá editar o desactivar un producto" screenName="Productos" />
            <FormEditProducto producto={responseProducto} categorias={ categorias}/>

        </main>
    );
}

