"use server";

import { Categoria } from "@/lib/Types";
import apiService from "../../../lib/server";

export async function getCategorias() {
  try {
    const response = await apiService.get<Categoria[]>("/categorias");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}
export async function getCategoriasActivas() {
  try {
    const response = await apiService.get<Categoria[]>("/categorias/activas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}
export async function getCategoriaById(id: string) {
  try {
    const response = await apiService.get<Categoria>(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return null;
  }
}

export async function postCategorias(nombre: string, descripcion: string) {
  const data = {
    nombre,
    descripcion,
  };
  try {
    const response = await apiService.post("/categorias", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}

export async function putCategoria(data: Categoria) {
console.log("🚀 ~ putCategoria ~ data:", data)

  try {
    const response = await apiService.put(`/categorias/${data.categoriaId}`, data);
    return response.data;
  } catch (error) {
    return [];
  }
}
