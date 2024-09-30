// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { FormProducto } from "../components/FormProducto";
import { PackagePlus, } from "lucide-react";
import { getCategoriasActivas } from "../../categorias/actions";

export default async function Create() {
    const categorias = await getCategoriasActivas()
    return (
        <div>

        <HeaderComponent Icon={PackagePlus} description="En este apartado podrá crear un producto" screenName="Productos" />
        <FormProducto categorias={categorias}></FormProducto>
        </div>
    );
}
