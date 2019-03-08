import { products } from '../../apis';
import { IAction } from '../schemas';
import * as ActionTypes from './ActionTypes';

export const getProducts = (page = 1, limit = 20): any => (dispatch: (action: IAction) => void) => {
  dispatch({
    type: ActionTypes.GET_PRODUCTS,
    params: {
      isFetching: true
    }
  });
  return products
    .getProducts(page, limit)
    .then((result) =>
      dispatch({
        type: ActionTypes.GET_PRODUCTS,
        params: {
          isFetching: false,
          success: true,
          data: result,
          page,
          limit
        }
      })
    )
    .catch((error) => {
      dispatch({
        type: ActionTypes.GET_PRODUCTS,
        params: {
          isFetching: false,
          success: false,
          error
        }
      });
    });
};

export const getProductDetail = (productId: number) => (dispatch: (action: IAction) => void) => {
  return products.getProductById(productId).then((result) =>
    dispatch({
      type: ActionTypes.GET_PRODUCT_DETAILS,
      params: {
        success: true,
        productId,
        data: result
      }
    })
  );
};
