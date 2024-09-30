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

export async function postCategorias({categoria}: {categoria: Categoria}) {
  try {
    const response = await apiService.post("/categorias", categoria);
    return response.data;
  } catch (error) {
    console.error("Error al guardar la categoría:", error);
    return [];
  }
}

export async function putCategoria({categoria}: {categoria: Categoria}) {
console.log("🚀 ~ putCategoria ~ categoria:", categoria)

  try {
    const response = await apiService.put(`/categorias/${categoria.categoriaId}`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    return error;
  }
}
