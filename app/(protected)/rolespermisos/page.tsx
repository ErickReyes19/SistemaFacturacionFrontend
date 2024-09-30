import HeaderComponent from "@/components/HeaderComponent";
import {
  ArrowRight,
  ListCheck,
  Settings2,
  User,
  User2,
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
          description="En este apartado podrá ver los diferentes usuarios, roles y permisos"
          screenName="Usuarios"
        />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <CardIconLink
            enlace="/usuarios"
            Icon={User2}
            nombre="Usuarios"
          />
          <CardIconLink
            enlace="/rolespermisos/roles"
            Icon={UserCog}
            nombre="Rol"
          />
          <CardIconLink
            enlace="/rolespermisos/permisos"
            Icon={ListCheck}
            nombre="Permisos"
          />
        </div>
      </CardContent>
    </Card>
  );
}
