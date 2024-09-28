import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"; // Asegúrate de importar correctamente tus componentes
import { ArrowRight } from "lucide-react"; // Asegúrate de que esta importación sea correcta

interface CardLinkProps {
  enlace: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  nombre: string;
}

export function CardIconLink({ enlace, Icon, nombre }: CardLinkProps) {
  return (
    <Link
      href={enlace}
      className="flex justify-between items-center col-span-12 md:col-span-4"
    >
      <Card className="w-full md:w-[500px] flex flex-col justify-between"> {/* Ajustamos el ancho aquí */}
        <CardContent className="flex items-center space-x-4 p-6">
          {Icon && <Icon aria-hidden="true" />}
          <div>
            <h2 className="text-2xl font-bold">{nombre}</h2>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-gray-600" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
