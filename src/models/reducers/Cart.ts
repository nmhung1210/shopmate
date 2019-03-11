import { ActionTypes } from '..';
import { IAction, IAttributeProductValue, ICartItem, IProductDetail } from '../schemas';

export interface ICartState {
  items: {
    [index: string]: ICartItem;
  };
  total: number;
}

export default function Cart (
  state = {
    items: {},
    total: 0
  } as ICartState,
  action: IAction
): ICartState {
  const { type, params } = action;
  switch (type) {
    case ActionTypes.ADD_CART_ITEM: {
      const { product, attributes, quantity } = params as ICartItem;
      const itemId = JSON.stringify({
        id: product.product_id,
        attr: attributes.map((attr) => attr.attribute_value)
      });
      const price = parseFloat(product.discounted_price) || parseFloat(product.price);
      const subtotal = quantity * price;
      const newState = { ...state };
      if (newState.items[itemId]) {
        newState.items[itemId].quantity += quantity;
        newState.items[itemId].subtotal += subtotal;
      } else {
        newState.items[itemId] = {
          product,
          attributes,
          quantity,
          itemId,
          subtotal
        };
      }
      newState.total = 0;
      Object.keys(newState.items).forEach((key) => {
        newState.total += newState.items[key].subtotal;
      });
      return newState;
    }

    case ActionTypes.REMOVE_CART_ITEM: {
      const { itemId } = params;
      if (state.items[itemId]) {
        const newState = { ...state };
        delete newState.items[itemId];
        newState.total = 0;
        Object.keys(newState.items).forEach((key) => {
          newState.total += newState.items[key].subtotal;
        });
        return newState;
      }
    }

    case ActionTypes.UPDATE_CART_ITEM: {
      const { itemId, quantity } = params;
      if (state.items[itemId]) {
        const newState = { ...state };
        const product = newState.items[itemId].product;
        const price = parseFloat(product.discounted_price) || parseFloat(product.price);
        newState.items[itemId].quantity = quantity;
        newState.items[itemId].subtotal = quantity * price;
        newState.total = 0;
        Object.keys(newState.items).forEach((key) => {
          newState.total += newState.items[key].subtotal;
        });
        return newState;
      }
    }

    case ActionTypes.CHECKOUT_CART: {
      return {
        total: 0,
        items: {}
      };
    }
  }
  return state;
}
