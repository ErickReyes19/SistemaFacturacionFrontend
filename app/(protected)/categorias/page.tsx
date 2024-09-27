
import HeaderComponent from "@/components/HeaderComponent";
import { getCategorias } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { ArrowDownToDot, Grid, Plus } from "lucide-react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default async function Categorias() {

    const data = await getCategorias();

    return (
        <div className="container mx-auto py-2">
            <HeaderComponent Icon={Grid} description="En este apartado podrá ver todas las categorías de sus productos" screenName="Categorías" />
            <DataTable columns={columns} data={data} />
        </div>

    );
}