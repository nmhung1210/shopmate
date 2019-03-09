export interface IAction {
  type: string;
  params?: any;
}

export interface ICartItem {
  item_id: number;
  product_id: number;
  name: string;
  attributes: IAttributeProductValue[];
  price: string;
  quantity: number;
  subtotal: string;
}

export interface ICategory {
  category_id: number;
  name: string;
  description: string;
  department_id: number;
}

export interface ICategoriesList {
  count: number;
  rows: ICategory[];
}

export interface IProductCategoryInfo {
  category_id: number;
  department_id: number;
  name: string;
}

export interface ICustomer {
  customer_id: number;
  name: string;
  email: string;
  address_1: string;
  address_2: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  shipping_region_id: number;
  day_phone: string;
  eve_phone: string;
  mob_phone: string;
}

export interface ICustomerAddress {
  address_1: string;
  address_2?: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  shipping_region_id: number;
}

export interface ICustomerRegister {
  customer: ICustomer;
  accessToken: string;
  expires_in: string;
}

export interface IDepartment {
  department_id: number;
  name: string;
  description: string;
}

export interface IProduct {
  product_id: number;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  thumbnail: string;
}

export interface IProductList {
  count: number;
  rows: IProduct[];
}

export interface IProductDetail {
  product_id: number;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  image: string;
  image_2: string;
}

export interface IProductComplete extends IProduct {
  image: string;
  image_2: string;
  display: number;
}

export interface IProductLocations {
  category_id: number;
  category_name: string;
  department_id: number;
  department_name: string;
}

export interface IReview {
  name: string;
  review: string;
  rating: number;
  created_on: string;
}

export interface IAttribute {
  attribute_id: number;
  name: string;
}

export interface IAttributeValue {
  attribute_value_id: number;
  value: string;
}

export interface IAttributeProductValue {
  attribute_value_id: number;
  attribute_name: string;
  attribute_value: string;
}

export interface IOrder {
  order_id: number;
  product_id: number;
  attributes: string;
  product_name: string;
  quantity: number;
  unit_cost: string;
  subtotal: string;
}

export interface IOrderStatus {
  order_id: number;
  total_amount: number;
  created_on: string;
  shipped_on: string;
  status: string;
  name: string;
}
