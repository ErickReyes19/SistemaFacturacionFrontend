import { redirect } from "next/navigation";
import { getCategoriaById } from "../../actions";
import { FormEditCategoria } from "./components/FormEditCategoria";
import HeaderComponent from "@/components/HeaderComponent";
import { Edit } from "lucide-react";

export default async function Home({
    params,
}: {
    params: { id: string };
}) {
    const responseCategoria = await getCategoriaById( params.id);
    if(responseCategoria === null){
        redirect("/categorias")
    }
    return (
        <main className="w-full">
            <HeaderComponent Icon={Edit} description="En este apartado podrá editar o desactivar una categoria de un producto" screenName="Categorías" />
            <FormEditCategoria categoria={responseCategoria} />

        </main>
    );
}

