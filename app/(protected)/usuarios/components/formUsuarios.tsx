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
import { postUsuarios } from "../actions";
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
import { useTransition } from "react"; 
import { UsuarioPostSchema } from "../shema";
import { Rol } from "@/lib/Types";

export function FormUsuario({ roles }: { roles: Rol[] }) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UsuarioPostSchema>>({
    resolver: zodResolver(UsuarioPostSchema),
  });

  const [isPending, startTransition] = useTransition(); 

  async function onSubmit(values: z.infer<typeof UsuarioPostSchema>) {
    startTransition(async () => {
      try {
        await postUsuarios({ usuario: values });
        toast({
          title: "Éxito",
          description: "Usuario creado con éxito",
        });
        router.push("/usuarios");
        router.refresh();
      } catch (error) {
        console.error("Error al enviar el usuario:", error);
        toast({
          title: "Error",
          description: `Error al crear el usuario: ${error}`,
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
            name="nombre"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nombre usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de usuario" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el nombre del usuario
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Correo del usuario</FormLabel>
                <FormControl>
                  <Input placeholder="admin@admin.com" type="email" {...field} />
                </FormControl>
                <FormDescription>Ingrese el correo del usuario</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="contrasena"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Contraseña del usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Contraseña" type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese la contraseña del usuario
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmarContrasena"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="Confirmar contraseña" type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Vuelva a ingresar la contraseña para confirmar
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="rolId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? roles.find(
                            (rol) => rol.rolId === field.value
                          )?.nombre
                        : "Seleccionar rol"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar rol..." />
                    <CommandList>
                      <CommandEmpty>No se encontraron roles.</CommandEmpty>
                      <CommandGroup>
                        {roles.map((rol) => (
                          <CommandItem
                            key={rol.rolId}
                            onSelect={() => {
                              form.setValue("rolId", rol.rolId);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                rol.rolId === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {rol.nombre}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Seleccione el rol del usuario
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Cargando..." : "Crear usuario"} {/* Cambiar texto del botón */}
        </Button>
      </form>
    </Form>
  );
}
