"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; 
import { useToast } from "@/hooks/use-toast";
import { RoleSchema } from "../../shema";
import { postRol } from "../../actions";
import PermissionCheckboxes from "./CheckBoxPermisos";
import { Permiso } from "@/lib/Types";
import React from "react";


export function FormRol({permisos}: {permisos: Permiso[]}) {
  const router = useRouter(); 
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
  });

  const [selectedPermisos, setSelectedPermisos] = React.useState<string[]>([]);

  const handlePermissionChange = (permisoId: string) => {
    setSelectedPermisos((prev) => 
      prev.includes(permisoId)
        ? prev.filter(id => id !== permisoId)
        : [...prev, permisoId]
    );
  };

  async function onSubmit(values: z.infer<typeof RoleSchema>) {
    try {
      const response = await postRol({rol: { ...values, permisosIds: selectedPermisos }});  
      console.log("🚀 ~ onSubmit ~ response:", response)

      toast({
        title: "Éxito",
        description: "Rol creado con éxito",
      });
      router.push("/rolespermisos/roles");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Error al editar el rol: ${error}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border rounded-md p-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre rol</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription>Ingrese el nombre del rol</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción" {...field} />
              </FormControl>
              <FormDescription>Ingrese la descripción</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Aquí agregamos el componente PermissionCheckboxes */}
        <FormItem>
          <FormLabel>Permisos</FormLabel>
          <PermissionCheckboxes
            permisos={permisos}  
            permisosIds={selectedPermisos}  // Pasamos los permisos seleccionados
            onChange={handlePermissionChange}  // Pasamos la función para manejar el cambio
          />
          <FormDescription>Seleccione los permisos para este rol</FormDescription>
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
