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
import { postProducto } from "../actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ProductoElementSchema } from "../schema";
import { getCategoriasActivas } from "../../categorias/actions";
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
import { Categoria } from "@/lib/Types";
import SkeletonTable from "../loading";

export function FormProducto() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProductoElementSchema>>({
    resolver: zodResolver(ProductoElementSchema),
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
        await postProducto(
          values.nombreProducto,
          values.precioProducto,
          values.descripcion,
          values.categoriaNombre,
          values.stock
        );
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
            name="stock"
            render={({ field }) => (
              <FormItem className="flex-1 w-1/2">
                <FormLabel>Stock Producto</FormLabel>
                <FormControl>
                  <Input placeholder="Stock" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el stock del producto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoriaNombre"
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
                                  "categoriaNombre",
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
