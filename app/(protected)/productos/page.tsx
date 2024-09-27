
import HeaderComponent from "@/components/HeaderComponent";
import { getProductos } from "./actions";
import { ArrowDownToDot, Grid, Package, Plus } from "lucide-react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";



export default async function Categorias() {

    const data = await getProductos();

    return (
        <div className="container mx-auto py-2">
            <HeaderComponent Icon={Package} description="En este apartado podrá ver todos los productos" screenName="Productos" />
            <DataTable columns={columns} data={data} />
        </div>

    );
}