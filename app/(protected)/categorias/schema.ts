import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"



export const CategoriaElementSchema = z.object({
    "nombre": z.string(),
    "descripcion": z.string(),
});

export function ProfileForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof CategoriaElementSchema>>({
      resolver: zodResolver(CategoriaElementSchema),
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof CategoriaElementSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  }


export type CategoriaElement = z.infer<typeof CategoriaElementSchema>;
