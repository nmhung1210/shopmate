import { IOrder, IOrderStatus } from '../models/schemas';
import api from './webApi';

// Create a Order and response orderId if success.
export function createOrder (cartId: string, customerId: number, shippingId: number, taxId: number): Promise<number> {
  return api
    .authPost('/orders', { cart_id: cartId, customer_id: customerId, shipping_id: shippingId, tax_id: taxId })
    .then(({ orderId }) => orderId);
}

export function getOrder (orderId: number): Promise<IOrder> {
  return api.authGet(`/orders/${orderId}`);
}

export function getCustomerOrders (): Promise<IOrder[]> {
  return api.authGet('/orders/inCustomer');
}

export function getOrderStatus (orderId: number): Promise<IOrderStatus> {
  return api.authGet(`/orders/shortDetail/${orderId}`);
}

export function updateOrderAuthCode (orderId: number, authCode: string, reference: string): Promise<IOrderStatus> {
  return api.authGet(`/order/setAuthCode/${orderId}`, {auth_code: authCode, reference});
}
