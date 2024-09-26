
import Login from "@/app/(public)/components/formLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function Page() {  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Esta es la pantalla de facturas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
<p>Hola</p>
        </div>
        nueva factura
      </CardContent>
    </Card>
  );
}
