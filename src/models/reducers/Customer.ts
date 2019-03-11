import { ActionTypes } from '..';
import { IAction, ICustomer } from '../schemas';

export default function Customer(state = {} as ICustomer, action: IAction): ICustomer {
  const { type, params } = action;
  switch (type) {
    case ActionTypes.CUSTOMER_LOGIN: {
      return {
        ...state,
        ...params
      };
    }
    case ActionTypes.CUSTOMER_LOGOUT: {
      return {} as ICustomer;
    }
  }
  return state;
}
