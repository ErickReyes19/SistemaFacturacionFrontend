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
import {  putCategoria } from "../../../actions";
import { useRouter } from "next/navigation"; // Cambiar aquí
import { useToast } from "@/hooks/use-toast";
import { Categoria } from "@/lib/Types";
import { Switch } from "@/components/ui/switch";
import { CategoriaElementSchema } from "../../../schema";




export function FormEditCategoria({categoria}:{categoria: Categoria}) {
  const router = useRouter(); // Usa useRouter aquí
  const { toast } = useToast();
  const form = useForm<z.infer<typeof CategoriaElementSchema>>({
    resolver: zodResolver(CategoriaElementSchema),
    defaultValues: {
      categoriaId: categoria.categoriaId,
      activo: categoria.activo,
      descripcion: categoria.descripcion,
      nombre: categoria.nombre,
    },
  });

  async function onSubmit(values: z.infer<typeof CategoriaElementSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values)
    try {
      await putCategoria({
        categoria: values
      });
      toast({
        title: "Éxito",
        description: "Categoría editada con éxito",
      });
      router.push("/categorias");
      router.refresh();
    } catch (error) {
      console.error("Error al enviar la categoría:", error);
      toast({
        title: "Error",
        description: `Error al editar la categoría: ${error}`,
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
                  <FormLabel className="text-base">Activar categoria</FormLabel>
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
                <FormLabel>Nombre Categoría</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el nombre de la categoría
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

          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </div>
  );
}
