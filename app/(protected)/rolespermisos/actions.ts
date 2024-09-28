"use server";

import { Permiso, Rol } from "@/lib/Types";
import apiService from "../../../lib/server";

export async function getRoles() {
  try {
    const response = await apiService.get<Rol[]>("/roles");
    return response.data;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return [];
  }
}

export async function getRolById(id: string) {
  try {
    const response = await apiService.get<Rol>(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return null;
  }
}

export async function postRol({ rol }: { rol: Rol }) {
  try {
    const response = await apiService.post("/roles", rol);
    return response.data;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    throw error;
  }
}

export async function putRol({ data }: { data: Rol }) {
  try {
    const response = await apiService.put(`/roles/${data.rolId}`, data);
    return response.data;
  } catch (error) {
    return [];
  }
}
export async function getPermisos() {
  try {
    const response = await apiService.get<Permiso[]>("/permisos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener permisos:", error);
    return [];
  }
}

export async function getPermisoById(id: string) {
  try {
    const response = await apiService.get<Permiso>(`/permisos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el permiso:", error);
    return null;
  }
}

export async function postPermiso({ permiso }: { permiso: Permiso }) {
  try {
    const response = await apiService.post("/permisos", permiso);
    return response.data;
  } catch (error) {
    console.error("Error al crear el permiso:", error);
    throw error;
  }
}

export async function putPermiso({ data }: { data: Permiso }) {
  try {
    const response = await apiService.put(`/permisos/${data.permisoId}`, data);
    return response.data;
  } catch (error) {
    return [];
  }
}
