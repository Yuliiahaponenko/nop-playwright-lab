import { APIRequestContext, APIResponse } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * API Client for nopCommerce API endpoints
 */
export class ApiClient {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.API_BASE_URL || 'https://nop-qa.portnov.com/api';
  }

  /**
   * GET request
   */
  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  /**
   * POST request
   */
  async post(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data,
    });
  }

  /**
   * PUT request
   */
  async put(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    return this.request.put(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data,
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }
}
