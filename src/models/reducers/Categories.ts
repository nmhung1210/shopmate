import { IAction, ICategory } from '../schemas';

export default function Categories (state = [] as ICategory[], action: IAction): ICategory[] {
  return state;
}
