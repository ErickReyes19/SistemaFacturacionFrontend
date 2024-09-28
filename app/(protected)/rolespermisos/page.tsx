import HeaderComponent from "@/components/HeaderComponent";
import {
  ArrowRight,
  ListCheck,
  Settings2,
  User,
  UserCog,
  Users,
} from "lucide-react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CardIconLink } from "@/components/CardIconLink";

export default async function Clientes() {
  return (
    <Card>
      <CardContent>
        <HeaderComponent
          Icon={UserCog}
          description="En este apartado podrá ver los diferentes roles, permisos y asignación de roles"
          screenName="Roles y permisos"
        />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <CardIconLink
            enlace="/rolespermisos/roles"
            Icon={UserCog}
            nombre="Rol"
          />
          <CardIconLink
            enlace="/rolesPermisos/permisos"
            Icon={ListCheck}
            nombre="Permisos"
          />
          <CardIconLink
            enlace="/rolesPermisos/asignarpermisos"
            Icon={Settings2}
            nombre="Asignar Permisos"
          />
        </div>
      </CardContent>
    </Card>
  );
}
