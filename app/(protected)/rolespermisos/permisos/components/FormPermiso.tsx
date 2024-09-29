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
import { postPermiso, postRol } from "../../actions";
import { PermisoElementSchema } from "../shema";



export function FormPermiso() {
  const router = useRouter(); 
  const { toast } = useToast();
  const form = useForm<z.infer<typeof PermisoElementSchema>>({
    resolver: zodResolver(PermisoElementSchema),
  });

  async function onSubmit(values: z.infer<typeof PermisoElementSchema>) {

    try {
      const response = await postPermiso({permiso: values});
      if(response === 200){
        toast({
          title: "Éxito",
          description: "Permiso creado con éxito",
        });
        router.push("/rolespermisos/permisos");
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Error al editar el permiso: ${error}`,
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
              <FormLabel>Nombre permiso</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese el nombre del permiso
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear</Button>
      </form>
    </Form>
  );
}
