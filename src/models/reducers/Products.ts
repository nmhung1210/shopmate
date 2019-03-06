import { IAction, IProduct } from '../schemas';

export default function Products (state = [] as IProduct[], action: IAction): IProduct[] {
  return state;
}
