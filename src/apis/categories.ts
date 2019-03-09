import { ICategoriesList, ICategory, IProductCategoryInfo } from '../models/schemas';
import api from './webApi';

export function apiGetCategories (page: number, limit: number): Promise<ICategoriesList> {
  return api.get('/categories', { page, limit });
}

export function apiGetCategoryById (id: number): Promise<ICategory> {
  return api.get(`/categories/${id}`);
}

export function apiGetCategoriesByProductId (id: number): Promise<IProductCategoryInfo[]> {
  return api.get(`/categories/inProduct/${id}`);
}

export function apiGetCategoriesByDepartmentId (id: number): Promise<ICategory[]> {
  return api.get(`/categories/inDepartment/${id}`);
}
