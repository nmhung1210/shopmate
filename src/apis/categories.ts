import api from './webApi';

export function getCategories () {
  return api.get('/categories');
}

export function getCategoryById (id: number) {
  return api.get(`/categories/${id}`);
}

export function getCategoriesByProductId (id: number) {
  return api.get(`/categories/inProduct/${id}`);
}

export function getCategoriesByDepartmentId (id: number) {
  return api.get(`/categories/inDepartment/${id}`);
}
