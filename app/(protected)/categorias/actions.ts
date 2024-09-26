'use server'

import { Categoria } from '@/lib/Types';
import apiService from '../../../lib/server';


export async function getCategorias() {
  try {
    const response = await apiService.get<Categoria[]>('/categorias');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
}

export async function postCategorias(nombre: string, descripcion: string) {
  const data = {
    nombre,
    descripcion
  }
  try {
    const response = await apiService.post('/categorias', data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
}