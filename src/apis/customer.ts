import { ICustomer, ICustomerAddress, ICustomerRegister } from '../models/schemas';
import { isValidEmail } from '../utils';
import api from './webApi';

export function updateCustomer (customer: ICustomer): Promise<any> {
  if (!api.isAuthorized()) {
    return Promise.reject('User unauthorized!');
  }
  const { customer_id, ...profiles } = customer;
  return api.put('/customer', profiles);
}

export function getCustomer (): Promise<ICustomer> {
  return api.get('/customer');
}

export function registerCustomer (name: string, email: string, password: string): Promise<any> {
  // Validate data first
  if (!name || !password || !isValidEmail(email)) {
    return Promise.reject('Invalid parameters!');
  }
  return api.post('/customers', { name, email, password });
}

export function customerLogin (email: string, password: string): Promise<ICustomerRegister> {
  // Validate data first
  if (!password || !isValidEmail(email)) {
    return Promise.reject('Invalid parameters!');
  }
  return api.post('/customers/login', { email, password });
}

// Sign in with a facebook login token.
export function customerFacebookLogin (accessToken: string): Promise<ICustomerRegister> {
  // Validate data first
  if (!accessToken) {
    return Promise.reject('Invalid parameters!');
  }
  return api.post('/customers/facebook', { access_token: accessToken});
}

// Update the address from customer
export function updateCustomerAddress (address: ICustomerAddress): Promise<any> {
  if (!api.isAuthorized()) {
    return Promise.reject('User unauthorized!');
  }
  return api.put('/customers/address', address);
}

// Update the credit card from customer
export function updateCustomerCreditCard (creditCard: string): Promise<any> {
  if (!api.isAuthorized()) {
    return Promise.reject('User unauthorized!');
  }
  return api.put('/customers/creditCard', {credit_card: creditCard});
}
