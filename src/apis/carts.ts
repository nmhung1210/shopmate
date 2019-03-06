// TODO: Backend for the cart is not ready yet. Using localstorage instead atm.
import api from './webApi';

export function createCart (): Promise<string> {
  return api.get('/shoppingcart/generateUniqueId').then(({cart_id}) => cart_id);
}
