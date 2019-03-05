import { IAction } from '../actions';

interface IProduct {
  product_id: number;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  image: string;
  image2: string;
  thumbnail: string;
  display: number;
}

export default function Products (state = [] as IProduct[], action: IAction): IProduct[] {
  return state;
}
