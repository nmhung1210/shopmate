import { IAction } from '../actions';

interface ICartItem {
  item_id: number;
  name: string;
  attributes: string;
  price: string;
  quantity: number;
  subtotal: string;
}

export default function Cart (state = [] as ICartItem[], action: IAction): ICartItem[] {
  return state;
}
