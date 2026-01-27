import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly successMessage: Locator;
  readonly orderNumber: Locator;
  readonly orderTotal: Locator;
  readonly orderDetails: Locator;
  readonly continueButton: Locator;
  readonly orderInfo: Locator;
  readonly shippingAddress: Locator;
  readonly billingAddress: Locator;
  readonly paymentMethod: Locator;
  readonly shippingMethod: Locator;

  constructor(page: Page) {
    super(page);
    this.successMessage = page.locator('.page-title:has-text("Thank you")');
    this.orderNumber = page.locator('.order-number');
    this.orderTotal = page.locator('.order-total');
    this.orderDetails = page.locator('.order-details');
    this.continueButton = page.locator('button:has-text("Continue")');
    this.orderInfo = page.locator('.order-info');
    this.shippingAddress = page.locator('.shipping-info');
    this.billingAddress = page.locator('.billing-info');
    this.paymentMethod = page.locator('.payment-method-info');
    this.shippingMethod = page.locator('.shipping-method-info');
  }

  /**
   * Verify order confirmation page is displayed
   */
  async verifyOrderConfirmation(): Promise<void> {
    const isVisible = await this.isVisible(this.successMessage);
    if (!isVisible) {
      throw new Error('Order confirmation page is not displayed');
    }
  }

  /**
   * Get order number
   */
  async getOrderNumber(): Promise<string> {
    if (await this.isVisible(this.orderNumber)) {
      const text = await this.getText(this.orderNumber);
      // Extract order number from text like "Order number: 12345"
      const match = text.match(/\d+/);
      return match ? match[0] : '';
    }
    return '';
  }

  /**
   * Verify order number is displayed
   */
  async verifyOrderNumber(): Promise<void> {
    const orderNumber = await this.getOrderNumber();
    if (!orderNumber) {
      throw new Error('Order number is not displayed');
    }
  }

  /**
   * Get order total
   */
  async getOrderTotal(): Promise<string> {
    if (await this.isVisible(this.orderTotal)) {
      return await this.getText(this.orderTotal);
    }
    return '';
  }

  /**
   * Verify success message
   */
  async verifySuccessMessage(): Promise<void> {
    const message = await this.getText(this.successMessage);
    if (!message.toLowerCase().includes('thank you') && 
        !message.toLowerCase().includes('successfully processed')) {
      throw new Error(`Expected success message not found. Got: "${message}"`);
    }
  }

  /**
   * Click continue button
   */
  async continue(): Promise<void> {
    await this.clickElement(this.continueButton);
    await this.waitForPageLoad();
  }
}
