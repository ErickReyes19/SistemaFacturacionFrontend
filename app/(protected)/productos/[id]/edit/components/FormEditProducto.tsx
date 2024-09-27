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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState, useTransition } from "react"; // Import useTransition
import { Categoria, Producto } from "@/lib/Types";
import SkeletonTable from "../../../loading";
import { putProducto } from "../../../actions";
import { getCategoriasActivas, putCategoria } from "@/app/(protected)/categorias/actions";
import { Switch } from "@/components/ui/switch";

export const ProductoElementSchema = z.object({
  "nombreProducto": z.string(),
  "precioProducto": z.string(),
  "descripcion": z.string(),
  "categoriaId": z.string(),
  "activo": z.boolean(),
});

interface FormEditProuctoProps {
  producto: Producto; // Debe ser de tipo Categoria
}

export function FormEditProducto({ producto }: FormEditProuctoProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProductoElementSchema>>({
    resolver: zodResolver(ProductoElementSchema),    
    defaultValues: {
      activo: producto.activo,
      descripcion: producto.descripcion,
      nombreProducto: producto.nombreProducto,
      precioProducto: producto.precioProducto.toString(),
      categoriaId: producto.categoriaNombre

    },
  });

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isPending, startTransition] = useTransition(); // Declare loading state

  useEffect(() => {
    const fetchCategorias = async () => {
      const fetchedCategorias: Categoria[] = await getCategoriasActivas();
      setCategorias(fetchedCategorias);
    };

    fetchCategorias();
  }, []);

  if (!categorias || categorias.length === 0) {
    return <SkeletonTable />;
  }

  async function onSubmit(values: z.infer<typeof ProductoElementSchema>) {
    startTransition(async () => {
      try {
        await putProducto({
          precioProducto: values.precioProducto,
          activo: values.activo,
          categoriaNombre: values.categoriaId,
          descripcion: values.descripcion,
          fechaRegistro: producto.fechaRegistro,
          nombreProducto: values.nombreProducto,
          productoId: producto.productoId
        });
        toast({
          title: "Éxito",
          description: "Producto creado con éxito",
        });
        router.push("/productos");
      } catch (error) {
        console.error("Error al enviar el producto:", error);
        toast({
          title: "Error",
          description: `Error al editar el producto: ${error}`,
        });
      }
    });
  }

  return (
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
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="nombreProducto"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nombre producto</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el nombre del producto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Descripción" {...field} />
                </FormControl>
                <FormDescription>Ingrese la descripción</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="precioProducto"
            render={({ field }) => (
              <FormItem className="flex-1 w-1/2">
                <FormLabel>Precio producto</FormLabel>
                <FormControl>
                  <Input placeholder="Precio" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el precio del producto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoriaId"
            render={({ field }) => (
              <FormItem className="flex-1 w-1/2">
                <FormLabel>Categoría</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full mt-2 justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categorias.find(
                              (categoria) =>
                                categoria.categoriaId === field.value
                            )?.nombre
                          : "Seleccionar categoría"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar categoría..." />
                      <CommandList>
                        <CommandEmpty>
                          No se encontraron categorías.
                        </CommandEmpty>
                        <CommandGroup>
                          {categorias.map((categoria) => (
                            <CommandItem
                              key={categoria.categoriaId}
                              onSelect={() => {
                                form.setValue(
                                  "categoriaId",
                                  categoria.categoriaId
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  categoria.categoriaId === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {categoria.nombre}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Seleccione la categoría del producto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Cargando..." : "Crear producto"} {/* Change button text */}
        </Button>
      </form>
    </Form>
  );
}
