import HeaderComponent from "@/components/HeaderComponent";
import { Package, UserCog } from "lucide-react";

import Link from "next/link";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getRoles } from "../actions";
import { Card, CardHeader } from "@/components/ui/card";

export default async function Categorias() {
  const data = await getRoles();

  return (
    <Card>
      <CardHeader>
        <HeaderComponent
          Icon={UserCog}
          description="En este apartado podrá ver todos los roles"
          screenName="Roles"
        />
        <DataTable columns={columns} data={data} />
      </CardHeader>
    </Card>
  );
}
