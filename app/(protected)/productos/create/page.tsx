// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { FormProducto } from "../components/FormProducto";
import { PackagePlus, } from "lucide-react";

export default function Create() {
    return (
        <div>

        <HeaderComponent Icon={PackagePlus} description="En este apartado podrá crear un producto" screenName="Productos" />
        <FormProducto></FormProducto>
        </div>
    );
}
