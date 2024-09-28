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



export function FormRol() {
  const router = useRouter(); 
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
  });

  async function onSubmit(values: z.infer<typeof RoleSchema>) {

    try {
      await postRol({rol: values});
      toast({
        title: "Éxito",
        description: "Rol creado con éxito",
      });
      router.push("/rolespermisos/roles");
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
