import { ApiClient } from '../ApiClient';
import { APIResponse } from '@playwright/test';

/**
 * User API Endpoints
 */
export class UserEndpoint {
  constructor(private apiClient: ApiClient) {}

  /**
   * Register new user
   */
  async registerUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<APIResponse> {
    return this.apiClient.post('/users/register', userData);
  }

  /**
   * Login user
   */
  async loginUser(email: string, password: string): Promise<APIResponse> {
    return this.apiClient.post('/users/login', {
      email,
      password,
    });
  }

  /**
   * Get user info
   */
  async getUserInfo(): Promise<APIResponse> {
    return this.apiClient.get('/users/me');
  }

  /**
   * Get user orders
   */
  async getUserOrders(): Promise<APIResponse> {
    return this.apiClient.get('/users/orders');
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId: number): Promise<APIResponse> {
    return this.apiClient.get(`/users/orders/${orderId}`);
  }
}
