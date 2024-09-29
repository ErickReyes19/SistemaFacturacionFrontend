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
import { postCategorias } from "../actions";
import { useRouter } from "next/navigation"; // Importa useRouter
import { useToast } from "@/hooks/use-toast";
import { CategoriaElementSchema } from "../schema";



export function FormCategoria() {
  const router = useRouter(); 
  const { toast } = useToast();
  const form = useForm<z.infer<typeof CategoriaElementSchema>>({
    resolver: zodResolver(CategoriaElementSchema),
  });

  async function onSubmit(values: z.infer<typeof CategoriaElementSchema>) {

    try {
      await postCategorias(values.nombre, values.descripcion);
      toast({
        title: "Éxito",
        description: "Categoría creada con éxito",
      });
      router.push("/categorias");
      router.refresh();
    } catch (error) {
      console.error("Error al enviar la categoría:", error);
      toast({
        title: "Error",
        description: `Error al editar la categoria: ${error}`,
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
              <FormLabel>Nombre Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese el nombre de la categoria
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
