import Cart from './Cart';
import Categories, { ICategoriesState } from './Categories';
import Customer from './Customer';
import Products, { IProductState } from './Products';

import { combineReducers } from 'redux';
import { ICustomer } from '../schemas';
import Dialogs, { IDialogState } from './Dialogs';

export interface IRootState {
  Cart: any;
  Categories: ICategoriesState;
  Customer: ICustomer;
  Products: IProductState;
  Dialogs: IDialogState;
}

const rootReducer = combineReducers({
  Cart,
  Categories,
  Customer,
  Products,
  Dialogs
});

export default rootReducer;
