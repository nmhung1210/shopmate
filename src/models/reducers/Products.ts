import { ActionTypes } from '..';
import {
  IAction,
  IAttributeProductValue,
  IProduct,
  IProductComplete,
  IProductDetail,
  IProductList,
  IReview
} from '../schemas';

export interface IProductDetailDict {
  [index: number]: IProductComplete;
}
export interface IProductState {
  products: IProductList;
  productDetail: IProductComplete | null;
  productAtrributes: IAttributeProductValue[];
  productReviews: IReview[];
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
    productDetail: null,
    productAtrributes: [],
    productReviews: [],
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
          productDetail: params.data
        };
      }
      break;
    case ActionTypes.GET_PRODUCT_ATTRIBUTES:
      if (params.success) {
        return {
          ...state,
          productAtrributes: params.data
        };
      }
      break;

    case ActionTypes.GET_PRODUCT_REVIEWS:
      if (params.success) {
        return {
          ...state,
          productReviews: params.data
        };
      }
      break;
  }
  return state;
}
