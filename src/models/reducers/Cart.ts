import { IAction, ICartItem } from '../schemas';

export default function Cart (state = [] as ICartItem[], action: IAction): ICartItem[] {
  return state;
}
