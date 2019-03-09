import Cart from './Cart';
import Categories, { ICategoriesState } from './Categories';
import Customer from './Customer';
import Departments from './Departments';
import Products, { IProductState } from './Products';
import Reviews from './Review';

import { combineReducers } from 'redux';

export interface IRootState {
  Cart: any;
  Categories: ICategoriesState;
  Customer: any;
  Departments: any;
  Products: IProductState;
  Reviews: any;
}

const rootReducer = combineReducers({
  Cart,
  Categories,
  Customer,
  Departments,
  Products,
  Reviews
});

export default rootReducer;
