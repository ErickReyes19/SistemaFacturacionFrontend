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
import { Rol } from "@/lib/Types";
import { Switch } from "@/components/ui/switch";
import { RoleSchema } from "@/app/(protected)/rolespermisos/shema";
import { putRol } from "@/app/(protected)/rolespermisos/actions";

export const CategoriaElementSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  activo: z.boolean(),
});

export function FormEditRol({ rol }: { rol: Rol }) {
  const router = useRouter(); // Usa useRouter aquí
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      rolId: rol.rolId,
      activo: rol.activo,
      descripcion: rol.descripcion,
      nombre: rol.nombre,
    },
  });

  async function onSubmit(values: z.infer<typeof RoleSchema>) {
    try {
      await putRol({data: values});
      toast({
        title: "Éxito",
        description: "Rol editada con éxito",
      });
      router.push("/rolespermisos/roles");
    } catch (error) {
      console.error("Error al editar el rol:", error);
      toast({
        title: "Error",
        description: `Error al editar el rol: ${error}`,
      });
    }
  }

  return (
    <div className="border p-4 rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Activar rol</FormLabel>
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
                <FormLabel>Nombre rol</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el nombre del rol
                </FormDescription>
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

          <Button type="submit">Editar</Button>
        </form>
      </Form>
    </div>
  );
}
