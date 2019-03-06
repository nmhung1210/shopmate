import { IAction, IDepartment } from '../schemas';

export default function Departments (state = [] as IDepartment[], action: IAction): IDepartment[] {
  return state;
}
