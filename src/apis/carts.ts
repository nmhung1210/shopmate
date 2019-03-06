import api from './webApi';

export function createCart (): Promise<string> {
  return api.get('/shoppingcart/generateUniqueId').then(({cart_id}) => cart_id);
}

export function addProduct () {
  // todo
}
