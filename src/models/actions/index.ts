import { Dispatch } from 'react';
import { DispatchProp } from 'react-redux';
import { attributeApis, categoryApis, productApis } from '../../apis';
import { IAction, IReview } from '../schemas';
import * as ActionTypes from './ActionTypes';

export const actionGetProducts = (page = 1, limit = 20): any => (
  dispatch: (action: IAction) => void
) => {
  dispatch({
    type: ActionTypes.GET_PRODUCTS,
    params: {
      isFetching: true
    }
  });
  return productApis
    .apiGetProducts(page, limit)
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

export const actionGetProductDetail = (productId: number): any => (
  dispatch: (action: IAction) => void
) => {
  return productApis.apiGetProductById(productId).then((result) =>
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

export const actionGetCategories = (page = 1, limit = 20): any => (
  dispatch: (action: IAction) => void
) => {
  dispatch({
    type: ActionTypes.GET_CATEGORIES,
    params: {
      isFetching: true
    }
  });
  return categoryApis
    .apiGetCategories(page, limit)
    .then((result) =>
      dispatch({
        type: ActionTypes.GET_CATEGORIES,
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
        type: ActionTypes.GET_CATEGORIES,
        params: {
          isFetching: false,
          success: false,
          error
        }
      });
    });
};

export const actionGetProductCategories = (productId: number): any => (
  dispatch: (action: IAction) => void
) => {
  return categoryApis.apiGetCategoriesByProductId(productId).then((result) =>
    dispatch({
      type: ActionTypes.GET_PRODUCT_CATEGORIES,
      params: {
        success: true,
        productId,
        data: result
      }
    })
  );
};

export const actionGetProductAttributes = (productId: number): any => (
  dispatch: (action: IAction) => void
) => {
  return attributeApis.apiGetAttributesByProductId(productId).then((result) =>
    dispatch({
      type: ActionTypes.GET_PRODUCT_ATTRIBUTES,
      params: {
        success: true,
        productId,
        data: result
      }
    })
  );
};

export const actionGetProductReviews = (productId: number): any => (
  dispatch: (action: IAction) => void
) => {
  return productApis.apiGetProductReviewsById(productId).then((result) =>
    dispatch({
      type: ActionTypes.GET_PRODUCT_REVIEWS,
      params: {
        success: true,
        productId,
        data: result
      }
    })
  );
};

export const actionPostProductReviews = (productId: number, review: IReview): any => (
  dispatch: (action: IAction) => void
) => {
  return productApis
    .apiPostProductReviewsById(productId, review.review, review.rating)
    .then(() => dispatch(actionGetProductReviews(productId)));
};
