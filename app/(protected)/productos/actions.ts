"use server";

import apiService from "../../../lib/server";
import { Producto, ProductoPost } from "./types";

export async function getProductos() {
  try {
    const response = await apiService.get<Producto[]>("/productos");

    return response.data;
  } catch (error) {
    console.error("Error al obtener los producto:", error);
    return [];
  }
}

export async function getProductoById(id: string) {
  try {
    const response = await apiService.get<ProductoPost>(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
}

export async function putProducto({ producto }: { producto: ProductoPost }) {
  try {
    const response = await apiService.put(
      `/productos/${producto.productoId}`,
      producto
    );

    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto: ", error);
    return [];
  }
}
export async function postProducto({ producto }: { producto: ProductoPost }) {
  try {
    const response = await apiService.post("/productos", producto);
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    return [];
  }
}
