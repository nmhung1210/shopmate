import { IDepartment } from '../models/schemas';
import api from './webApi';

export function getDepartments (): Promise<IDepartment[]> {
  return api.get('/departments');
}

export function getDepartmentById (id: number): Promise<IDepartment> {
  return api.get(`/departments/${id}`);
}
