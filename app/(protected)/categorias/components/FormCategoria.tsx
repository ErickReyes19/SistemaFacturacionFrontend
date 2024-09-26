"use client"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postCategorias } from "../actions"


export const CategoriaElementSchema = z.object({
    "nombre": z.string(),
    "descripcion": z.string(),
});

export function FormCategoria() {
    const form = useForm<z.infer<typeof CategoriaElementSchema>>({
        resolver: zodResolver(CategoriaElementSchema),
      })
     
      function onSubmit(values: z.infer<typeof CategoriaElementSchema>) {
        console.log(values)
        postCategorias(values.nombre, values.descripcion)
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormDescription>
               Ingrese la descripción
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
