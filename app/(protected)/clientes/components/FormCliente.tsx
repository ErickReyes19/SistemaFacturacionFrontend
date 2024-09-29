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
// import { postCategorias } from "../actions";
import { useRouter } from "next/navigation"; // Importa useRouter
import { useToast } from "@/hooks/use-toast";
import { ClienteElementSchema } from "../schema";
import { postCliente } from "../actions";
export function FormCliente() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ClienteElementSchema>>({
    resolver: zodResolver(ClienteElementSchema)
  });

  async function onSubmit(values: z.infer<typeof ClienteElementSchema>) {
    try {
    
      await postCliente({ cliente: values });
      toast({
        title: "Éxito",
        description: "Cliente creado con éxito",
      });
      router.push("/clientes");
      router.refresh();
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      toast({
        title: "Error",
        description: `Error al editar el cliente: ${error}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border rounded-md p-4"
      >
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
  );
}

