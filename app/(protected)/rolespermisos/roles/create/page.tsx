// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { FormRol } from "../components/FormRol";
import { PlusCircle, UserPen } from "lucide-react";

export default function Create() {
    return (
        <div>

        <HeaderComponent Icon={UserPen} description="En este apartado podrá crear una rol" screenName="Roles" />
        <FormRol></FormRol>
        </div>
    );
}
