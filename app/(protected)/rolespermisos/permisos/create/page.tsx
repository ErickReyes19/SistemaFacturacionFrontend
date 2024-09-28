// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { FormPermiso } from "../components/FormPermiso";
import { PenBox, PlusCircle } from "lucide-react";

export default function Create() {
    return (
        <div>

        <HeaderComponent Icon={PenBox} description="En este apartado podrá crear un permiso" screenName="Permisos" />
        <FormPermiso></FormPermiso>
        </div>
    );
}
