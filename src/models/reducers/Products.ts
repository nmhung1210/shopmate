import { ActionTypes } from '..';
import { IAction, IProduct, IProductComplete, IProductList } from '../schemas';

export interface IProductDetailDict {
  [index: number]: IProductComplete;
}
export interface IProductState {
  products: IProductList;
  productDetails: IProductDetailDict;
  page: number;
  limit: number;
  promotion: IProduct | null;
  fetchingCount: number;
}

export default function Products (
  state = {
    products: {
      count: 0,
      rows: []
    },
    productDetails: {},
    page: 1,
    limit: 20,
    promotion: null,
    fetchingCount: 0
  } as IProductState,
  action: IAction
): IProductState {
  const { type, params } = action;
  switch (type) {
    case ActionTypes.GET_PRODUCTS:
      if (params.isFetching) {
        return {
          ...state,
          fetchingCount: state.fetchingCount + 1
        };
      }
      const newState = {
        ...state,
        fetchingCount: state.fetchingCount - 1
      };
      if (params.success) {
        const { limit, page, data } = params;
        newState.limit = limit;
        newState.page = page;
        newState.products = data;
        // Pick a product to promotion.
        // TODO: need to be manage by backend.
        if (newState.products.rows.length) {
          newState.promotion = newState.products.rows[0];
        }
      }
      return newState;
    case ActionTypes.GET_PRODUCT_DETAILS:
      if (params.success) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            [params.productId]: params.data
          }
        };
      }
      break;
  }
  return state;
}
