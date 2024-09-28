import HeaderComponent from "@/components/HeaderComponent";
import { ListChecks, Package, UserCog } from "lucide-react";

import Link from "next/link";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getPermisoById, getPermisos, getRoles } from "../actions";
import { Card, CardHeader } from "@/components/ui/card";

export default async function Permisos() {
  const data = await getPermisos();

  return (
    <Card>
      <CardHeader>
        <HeaderComponent
          Icon={ListChecks}
          description="En este apartado podrá ver todos los permisos"
          screenName="permisos"
        />
        <DataTable columns={columns} data={data} />
      </CardHeader>
    </Card>
  );
}
