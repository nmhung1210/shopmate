import { IAction } from '../actions';

interface IDepartment {
  department_id: number;
  name: string;
  description: string;
}

export default function Departments (state = [] as IDepartment[], action: IAction): IDepartment[] {
  return state;
}
