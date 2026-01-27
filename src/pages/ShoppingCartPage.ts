import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class ShoppingCartPage extends BasePage {
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly continueShoppingButton: Locator;
  readonly updateCartButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartTotal: Locator;
  readonly subtotal: Locator;
  readonly shippingCost: Locator;
  readonly tax: Locator;
  readonly orderTotal: Locator;
  readonly couponCodeInput: Locator;
  readonly applyCouponButton: Locator;
  readonly discountApplied: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart-item-row');
    this.emptyCartMessage = page.locator('.no-data:has-text("Your Shopping Cart is empty")');
    this.continueShoppingButton = page.locator('button:has-text("Continue shopping")');
    this.updateCartButton = page.locator('button:has-text("Update shopping cart")');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.cartTotal = page.locator('.cart-total');
    this.subtotal = page.locator('.cart-total-left:has-text("Sub-Total")').locator('..').locator('.cart-total-right');
    this.shippingCost = page.locator('.cart-total-left:has-text("Shipping")').locator('..').locator('.cart-total-right');
    this.tax = page.locator('.cart-total-left:has-text("Tax")').locator('..').locator('.cart-total-right');
    this.orderTotal = page.locator('.cart-total-left:has-text("Order Total")').locator('..').locator('.cart-total-right');
    this.couponCodeInput = page.locator('#discountcouponcode');
    this.applyCouponButton = page.locator('button:has-text("Apply coupon")');
    this.discountApplied = page.locator('.discount-coupon-code');
  }

  /**
   * Navigate to shopping cart page
   */
  async goto(): Promise<void> {
    await this.navigate('/cart');
    await this.waitForPageLoad();
  }

  /**
   * Get number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get quantity input for a cart item
   */
  getQuantityInput(index: number): Locator {
    return this.cartItems.nth(index).locator('input[type="number"]');
  }

  /**
   * Get remove checkbox for a cart item
   */
  getRemoveCheckbox(index: number): Locator {
    return this.cartItems.nth(index).locator('input[type="checkbox"][name*="remove"]');
  }

  /**
   * Update quantity of a cart item
   */
  async updateQuantity(index: number, quantity: number): Promise<void> {
    const quantityInput = this.getQuantityInput(index);
    await this.fillInput(quantityInput, quantity.toString());
    await this.clickElement(this.updateCartButton);
    await this.waitForPageLoad();
  }

  /**
   * Remove item from cart
   */
  async removeItem(index: number): Promise<void> {
    const removeCheckbox = this.getRemoveCheckbox(index);
    await this.clickElement(removeCheckbox);
    await this.clickElement(this.updateCartButton);
    await this.waitForPageLoad();
  }

  /**
   * Remove all items from cart
   */
  async removeAllItems(): Promise<void> {
    const itemCount = await this.getCartItemCount();
    for (let i = 0; i < itemCount; i++) {
      const removeCheckbox = this.getRemoveCheckbox(i);
      if (await this.isVisible(removeCheckbox)) {
        await this.clickElement(removeCheckbox);
      }
    }
    if (itemCount > 0) {
      await this.clickElement(this.updateCartButton);
      await this.waitForPageLoad();
    }
  }

  /**
   * Verify cart is empty
   */
  async verifyCartIsEmpty(): Promise<void> {
    const isEmpty = await this.isVisible(this.emptyCartMessage);
    if (!isEmpty) {
      throw new Error('Cart is not empty');
    }
  }

  /**
   * Verify cart has items
   */
  async verifyCartHasItems(expectedCount?: number): Promise<void> {
    const itemCount = await this.getCartItemCount();
    if (itemCount === 0) {
      throw new Error('Cart is empty');
    }
    if (expectedCount !== undefined && itemCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items, but found ${itemCount}`);
    }
  }

  /**
   * Get product name from cart item
   */
  async getProductName(index: number): Promise<string> {
    const productName = this.cartItems.nth(index).locator('.product-name a');
    return await this.getText(productName);
  }

  /**
   * Get product price from cart item
   */
  async getProductPrice(index: number): Promise<string> {
    const productPrice = this.cartItems.nth(index).locator('.product-unit-price');
    return await this.getText(productPrice);
  }

  /**
   * Get subtotal
   */
  async getSubtotal(): Promise<string> {
    if (await this.isVisible(this.subtotal)) {
      return await this.getText(this.subtotal);
    }
    return '';
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
   * Apply coupon code
   */
  async applyCouponCode(couponCode: string): Promise<void> {
    await this.fillInput(this.couponCodeInput, couponCode);
    await this.clickElement(this.applyCouponButton);
    await this.waitForPageLoad();
  }

  /**
   * Click checkout button
   */
  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
    await this.waitForPageLoad();
  }

  /**
   * Click continue shopping
   */
  async continueShopping(): Promise<void> {
    await this.clickElement(this.continueShoppingButton);
    await this.waitForPageLoad();
  }
}
