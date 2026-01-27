import { ApiClient } from '../ApiClient';
import { APIResponse } from '@playwright/test';

/**
 * Cart API Endpoints
 */
export class CartEndpoint {
  constructor(private apiClient: ApiClient) {}

  /**
   * Get cart items
   */
  async getCartItems(): Promise<APIResponse> {
    return this.apiClient.get('/cart');
  }

  /**
   * Add product to cart
   */
  async addToCart(productId: number, quantity = 1): Promise<APIResponse> {
    return this.apiClient.post('/cart/add', {
      productId,
      quantity,
    });
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId: number, quantity: number): Promise<APIResponse> {
    return this.apiClient.put(`/cart/${itemId}`, {
      quantity,
    });
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: number): Promise<APIResponse> {
    return this.apiClient.delete(`/cart/${itemId}`);
  }

  /**
   * Clear cart
   */
  async clearCart(): Promise<APIResponse> {
    return this.apiClient.delete('/cart');
  }
}
