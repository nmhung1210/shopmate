import {
  IProductComplete,
  IProductDetail,
  IProductList,
  IProductLocations,
  IReview
} from '../models/schemas';
import api from './webApi';

export function getProducts (page = 1, limit = 20, descriptionLength = 200): Promise<IProductList> {
  return api.get('/products', { page, limit, description_length: descriptionLength });
}

export function searchProducts (
  query: string,
  allWords = 'on',
  page = 1,
  limit = 20,
  descriptionLength = 200
): Promise<IProductList> {
  return api.get('/products/search', {
    query_string: query,
    all_words: allWords,
    page,
    limit,
    description_length: descriptionLength
  });
}

export function getProductById (id: number): Promise<IProductComplete> {
  return api.get(`/products/${id}`);
}

// Get a list of Products of Categories
export function getProductByCategoryId (id: number): Promise<IProductList> {
  return api.get(`/products/inCategory/${id}`);
}

// Get a list of Products of Departments
export function getProductByDepartmentId (id: number): Promise<IProductList> {
  return api.get(`/products/inDepartment/${id}`);
}

// Get details of a product by product's id
export function getProductDetailById (id: number): Promise<IProductDetail> {
  return api.get(`/products/${id}/details`);
}

// Get locations of a product by product's id
export function getProductLocationsById (id: number): Promise<IProductLocations> {
  return api.get(`/products/${id}/locations`);
}

// Get reviews of a product by product's id
export function getProductReviewsById (id: number): Promise<IReview[]> {
  return api.get(`/products/${id}/reviews`);
}

// Post a review for a product.
export function postProductReviewsById (productId: number, review: string, rating: number): Promise<any> {
  return api.post(`/products/${productId}/reviews`, { review, rating });
}
