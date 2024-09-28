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
import {  putCliente } from "../../../actions";
import { useRouter } from "next/navigation"; // Cambiar aquí
import { useToast } from "@/hooks/use-toast";
import { Categoria, Cliente } from "@/lib/Types";
import { Switch } from "@/components/ui/switch";
import { ClienteElementSchema } from "../../../schema";

export const CategoriaElementSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  activo: z.boolean(),
});


export function FormEditCliente({ cliente }: {cliente: Cliente}) {
  const router = useRouter(); 
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ClienteElementSchema>>({
    resolver: zodResolver(ClienteElementSchema),
    defaultValues: {
      nombre: cliente.nombre,
      activo: cliente.activo,
      apellido: cliente.apellido,
      clienteId: cliente.clienteId,
      correo: cliente.correo,
      direccion: cliente.direccion,
      fechaRegistro: cliente.fechaRegistro,
      identidad: cliente.identidad,
      telefono: cliente.telefono
    },
  });

  async function onSubmit(values: z.infer<typeof ClienteElementSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values)
    
    try {
      await putCliente({ data: values } );
      toast({
        title: "Éxito",
        description: "Categoría editada con éxito",
      });
      router.push("/clientes");
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border rounded-md p-4"
      >
               <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Activar cliente</FormLabel>
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="identidad"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel>Identidad cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Identidad del cliente" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese la identidad del cliente
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel>Nombre Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el nombre del cliente
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Apellido" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el apellido del cliente
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="Correo" type="email" {...field} />
              </FormControl>
              <FormDescription>Ingrese el correo del cliente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Teléfono" type="tel" {...field} />
              </FormControl>
              <FormDescription>Ingrese el teléfono del cliente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Dirección" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese la dirección del cliente
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear</Button>
      </form>
      </Form>
    </div>
  );
}
