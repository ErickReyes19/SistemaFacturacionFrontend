"use server";

import { Producto } from "@/lib/Types";
import apiService from "../../../lib/server";

export async function getProductos() {
  try {
    const response = await apiService.get<Producto[]>("/productos");
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}

export async function getProductoById(id: string) {
  try {
    const response = await apiService.get<Producto>(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
}

export async function putProducto(data: Producto) {
  console.log("🚀 ~ putProducto ~ data:", data)
  try {
    
    const response = await apiService.put(`/productos/${data.productoId}`, {
      ...data, 
      CategoriaId: data.categoriaNombre, 
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error); 
    return [];
  }
}
export async function postProducto(
  nombreProducto: string,
  precioProducto: string,
  descripcion: string,
  categoriaNombre: string,
  stock: string
) {
  const data = {
    nombreProducto,
    precioProducto,
    descripcion,
    categoriaNombre,
    stock
  };
  try {
    const response = await apiService.post("/productos", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}
