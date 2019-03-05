import { IAction } from '../actions';

interface IReview {
  name: string;
  review: string;
  rating: number;
  created_on: string;
}

export default function Reviews (state= [] as IReview[], action: IAction): IReview[] {
  return state;
}
