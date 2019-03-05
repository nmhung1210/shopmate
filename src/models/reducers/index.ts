import Cart from './Cart';
import Categories from './Categories';
import Customer from './Customer';
import Departments from './Departments';
import Products from './Products';
import Reviews from './Review';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  Cart,
  Categories,
  Customer,
  Departments,
  Products,
  Reviews
});

export default rootReducer;
