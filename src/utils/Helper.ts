import { Page } from '@playwright/test';

/**
 * Helper Utility
 * Provides common helper functions for test execution
 */

export class Helper {
  /**
   * Wait for network to be idle
   */
  static async waitForNetworkIdle(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for specific amount of time
   */
  static async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Generate random number between min and max
   */
  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Format currency
   */
  static formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  /**
   * Extract number from string
   */
  static extractNumber(text: string): number {
    const match = text.match(/[\d,]+\.?\d*/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return 0;
  }

  /**
   * Extract price from text
   */
  static extractPrice(text: string): number {
    return this.extractNumber(text);
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshots/${name}-${timestamp}.png`;
    await page.screenshot({ path: filename, fullPage: true });
  }

  /**
   * Retry function
   */
  static async retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 1000
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await this.wait(delay);
        return this.retry(fn, retries - 1, delay);
      }
      throw error;
    }
  }

  /**
   * Check if string contains substring (case insensitive)
   */
  static containsIgnoreCase(text: string, substring: string): boolean {
    return text.toLowerCase().includes(substring.toLowerCase());
  }

  /**
   * Generate date string in format YYYY-MM-DD
   */
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Get future date
   */
  static getFutureDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
}
