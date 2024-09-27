// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { FormCategoria } from "../components/FormCategoria";
import { PlusCircle } from "lucide-react";

export default function Create() {
    return (
        <div>

        <HeaderComponent Icon={PlusCircle} description="En este apartado podrá crear una categoria de un producto" screenName="Categorías" />
        <FormCategoria></FormCategoria>
        </div>
    );
}
