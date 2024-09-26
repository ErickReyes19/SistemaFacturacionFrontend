
import HeaderComponent from "@/components/HeaderComponent";
import { getCategorias } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { ArrowDownToDot, Grid, Plus } from "lucide-react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";



export default async function Categorias() {

    const data = await getCategorias();

    return (
        <div className="container mx-auto py-2">
            <div className="flex justify-end mb-4">
                <Button>Nueva categoría <Plus /></Button>
            </div>
            <HeaderComponent Icon={Grid} description="En este apartado podrá ver todas las categorías de sus productos" screenName="Categorías" />
            <DataTable columns={columns} data={data} />
        </div>

    );
}