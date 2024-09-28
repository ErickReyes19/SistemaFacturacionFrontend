
import HeaderComponent from "@/components/HeaderComponent";
import { getClientes } from "./actions";
import { ArrowDownToDot, Grid, Package, Plus, Users } from "lucide-react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";



export default async function Clientes() {

    const data = await getClientes();

    return (
        <div className="container mx-auto py-2">
            <HeaderComponent Icon={Users} description="En este apartado podrá ver todos los clientes" screenName="Clientes" />
            <DataTable columns={columns} data={data} />
        </div>

    );
}