"use client";

import { useEffect, useState } from "react";
import Login from "@/app/(public)/components/formLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSessionUsuario, getSessionPermisos } from "../../../auth"; // Asegúrate de que esta ruta sea correcta

// Asegúrate de que este tipo está definido correctamente
interface UsuarioSesion {
  userId: string;
  Usuario: string;
  permisos: string[]; 
  exp: number;
}

export default function Page() {  
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null); // Especifica el tipo aquí
  const [permisos, setPermisos] = useState<string[]>([]);

  useEffect(() => {
    const fetchSessionData = async () => {
      const userData = await getSessionUsuario();
      const permissionsData = await getSessionPermisos();
      
      setUsuario(userData); // Ahora 'userData' puede ser 'UsuarioSesion | null'
      setPermisos(permissionsData || []);
    };

    fetchSessionData();
  }, []);

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
          {usuario ? (
            <div>
              <p>Usuario: {usuario.Usuario}</p>
              <p>Permisos:</p>
              <ul>
                {permisos.map((permiso, index) => (
                  <li key={index}>{permiso}</li>
                ))}
              </ul>
            </div>
          ) : (
            <Login />  // Renderiza tu componente de Login si no hay usuario
          )}
        </div>
        nueva factura
      </CardContent>
    </Card>
  );
}
