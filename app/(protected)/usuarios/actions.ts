"use server";

import apiService from "../../../lib/server";
import { Usuario, UsuarioPost } from "./type";

export async function getUsuarios() {
  try {
    const response = await apiService.get<Usuario[]>("/usuarios");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}
export async function getUsuariosActivas() {
  try {
    const response = await apiService.get<Usuario[]>("/usuarios/activas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}
export async function getUsuarioById(id: string) {
  try {
    const response = await apiService.get<Usuario>(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return null;
  }
}

export async function postUsuarios({usuario}: {usuario: UsuarioPost}) {
  try {
    const response = await apiService.post("/usuarios", usuario);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}

export async function putUsuario({usuario}: {usuario: UsuarioPost}) {
  try {
    const response = await apiService.put(`/usuarios/${usuario.usuarioId}`, usuario);
    return response.data;
  } catch (error) {
    return [];
  }
}
