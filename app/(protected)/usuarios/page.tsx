
import HeaderComponent from "@/components/HeaderComponent";
import { getUsuarios } from "./actions";

import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Users } from "lucide-react";



export default async function Clientes() {

    const data = await getUsuarios();

    return (
        <div className="container mx-auto py-2">
            <HeaderComponent Icon={Users} description="En este apartado podrá ver todos los usuarios" screenName="Usuarios" />
            <DataTable columns={columns} data={data} />
        </div>

    );
}