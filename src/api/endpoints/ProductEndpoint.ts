import { ApiClient } from '../ApiClient';
import { APIResponse } from '@playwright/test';

/**
 * Product API Endpoints
 */
export class ProductEndpoint {
  constructor(private apiClient: ApiClient) {}

  /**
   * Get all products
   */
  async getAllProducts(): Promise<APIResponse> {
    return this.apiClient.get('/products');
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: number): Promise<APIResponse> {
    return this.apiClient.get(`/products/${productId}`);
  }

  /**
   * Search products
   */
  async searchProducts(keyword: string): Promise<APIResponse> {
    return this.apiClient.get(`/products/search?keyword=${encodeURIComponent(keyword)}`);
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId: number): Promise<APIResponse> {
    return this.apiClient.get(`/products/category/${categoryId}`);
  }
}
