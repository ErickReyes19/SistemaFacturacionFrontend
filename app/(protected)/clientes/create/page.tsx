// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { FormCliente } from "../components/FormCliente";
import { PackagePlus, UserPlus, } from "lucide-react";

export default function Create() {
    return (
        <div>

        <HeaderComponent Icon={UserPlus} description="En este apartado podrá crear un cliente" screenName="Clientes" />
        <FormCliente></FormCliente>
        </div>
    );
}
