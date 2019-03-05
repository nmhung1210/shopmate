import { IAction } from '../actions';

interface ICustomer {
  customer_id?: number;
  name?: string;
  email?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country?: string;
  shipping_region_id?: number;
  day_phone?: string;
  eve_phone?: string;
  mob_phone?: string;
  accessToken?: string;
  expires_in?:	string;
}

export default function Customer (state = {} as ICustomer, action: IAction): ICustomer {
  return state;
}
