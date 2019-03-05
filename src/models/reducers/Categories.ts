import { IAction } from '../actions';

interface ICategory {
  category_id: number;
  name:	string;
  description: string;
  department_id: number;
}

export default function Categories (state = [] as ICategory[], action: IAction): ICategory[] {
  return state;
}
