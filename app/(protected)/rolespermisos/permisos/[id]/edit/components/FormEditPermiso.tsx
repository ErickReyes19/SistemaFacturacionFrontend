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
import { useRouter } from "next/navigation"; // Cambiar aquí
import { useToast } from "@/hooks/use-toast";
import { Permiso } from "@/lib/Types";
import { Trash2 } from "lucide-react";
import { PermisoElementSchema } from "../../../shema";
import { putPermiso, deleltePermisoById } from "@/app/(protected)/rolespermisos/actions"; // Asegúrate de que esté definida la función deletePermiso
import { Switch } from "@/components/ui/switch";

export function FormEditPermiso({ permiso }: { permiso: Permiso }) {
  const router = useRouter(); // Usa useRouter aquí
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof PermisoElementSchema>>({
    resolver: zodResolver(PermisoElementSchema),
    defaultValues: {
      permisoId: permiso.permisoId,
      activo: permiso.activo,
      nombre: permiso.nombre,
      fechaCreacion: permiso.fechaCreacion,
    },
  });

  async function onSubmit(values: z.infer<typeof PermisoElementSchema>) {
    try {
      await putPermiso({ data: values });
      toast({
        title: "Éxito",
        description: "Permiso editado con éxito",
      });
      router.push("/rolespermisos/permisos");
    } catch (error) {
      console.error("Error al editar el permiso:", error);
      toast({
        title: "Error",
        description: `Error al editar el permiso: ${error}`,
      });
    }
  }

  async function handleDeletePermiso(id: string) {
    try {
      const response = await deleltePermisoById(id); 
      console.log("🚀 ~ handleDeletePermiso ~ response:", response)
      if(response == 200){
        toast({
          title: "Permiso eliminado",
          description: `El permiso ${permiso.nombre} fue eliminado correctamente.`,
        });
        router.push("/rolespermisos/permisos");
        router.refresh();
      }
    } catch (error) {
      console.error("Error al eliminar el permiso:", error);
      toast({
        title: "Error",
        description: `Error al eliminar el permiso: ${error}`,
      });
    }
  }

  return (
    <div className="border p-4 rounded-md">
      <div className="flex items-center py-4 justify-end">
        <Button onClick={() => handleDeletePermiso(permiso.permisoId)}>
          <Trash2 /> Eliminar
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Activar permiso</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del permiso</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormDescription>Ingrese el nombre del permiso</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Editar</Button>
        </form>
      </Form>
    </div>
  );
}
