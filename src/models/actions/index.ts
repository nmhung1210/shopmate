import { Dispatch } from 'react';
import { DispatchProp } from 'react-redux';
import { attributeApis, categoryApis, productApis } from '../../apis';
import { apiCustomerLogin, apiRegisterCustomer } from '../../apis/customer';
import api from '../../apis/webApi';
import { IDialogProps } from '../reducers/Dialogs';
import {
  IAction,
  IAttributeProductValue,
  ICustomer,
  ICustomerRegister,
  IProductComplete,
  IProductDetail,
  IReview
} from '../schemas';
import * as ActionTypes from './ActionTypes';

export const actionGetProducts = (page = 1, limit = 6): any => (
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
  if (!api.isAuthorized()) {
    dispatch(actionShowDialog('login', {}));
  }
  return productApis
    .apiPostProductReviewsById(productId, review.review, review.rating)
    .then(() => dispatch(actionGetProductReviews(productId)));
};

export const actionShowDialog = (name: string, props: IDialogProps): IAction => {
  return {
    type: ActionTypes.MODAL_DIALOG,
    params: {
      name,
      ...props,
      show: true
    }
  };
};

export const actionHideDialog = (name: string): IAction => {
  return {
    type: ActionTypes.MODAL_DIALOG,
    params: {
      name,
      show: false
    }
  };
};

export const actionCustomerLogOut = (): IAction => {
  api.auth('');
  return {
    type: ActionTypes.CUSTOMER_LOGOUT,
    params: {}
  };
};

export const actionCustomerLogin = (email: string, password: string): any => (
  dispatch: (action: IAction) => void
) => {
  dispatch(
    actionShowDialog('login', {
      requesting: true
    })
  );
  return apiCustomerLogin(email, password)
    .then((result: ICustomerRegister) => {
      api.auth(result.accessToken);
      dispatch(actionHideDialog('login'));
      dispatch({
        type: ActionTypes.CUSTOMER_LOGIN,
        params: result.user
      });
      return result;
    })
    .catch((error) => {
      dispatch(
        actionShowDialog('login', {
          error: 'Login failed! Please try again!'
        })
      );
    });
};

export const actionCustomerRegister = (email: string, password: string): any => (
  dispatch: (action: IAction) => void
) => {
  dispatch(
    actionShowDialog('register', {
      requesting: true
    })
  );
  return apiRegisterCustomer(email, email, password)
    .then((result: ICustomerRegister) => {
      api.auth(result.accessToken);
      dispatch(actionHideDialog('register'));
      dispatch({
        type: ActionTypes.CUSTOMER_LOGIN,
        params: result.user
      });
      return result;
    })
    .catch((error) => {
      dispatch(
        actionShowDialog('register', {
          error: 'Register failed! Please try again!'
        })
      );
    });
};

export const actionAddCartItem = (
  product: IProductComplete,
  attributes: IAttributeProductValue[],
  quantity: number
): IAction => {
  return {
    type: ActionTypes.ADD_CART_ITEM,
    params: {
      product,
      attributes,
      quantity
    }
  };
};

export const actionRemoveCartItem = (itemId: string): IAction => {
  return {
    type: ActionTypes.REMOVE_CART_ITEM,
    params: {
      itemId
    }
  };
};

export const actionUpdateCartItemQuantity = (itemId: string, quantity: number): IAction => {
  return {
    type: ActionTypes.UPDATE_CART_ITEM,
    params: {
      itemId,
      quantity
    }
  };
};

export const actionCartCheckout = (): IAction => {
  return {
    type: ActionTypes.CHECKOUT_CART,
    params: {}
  };
};
