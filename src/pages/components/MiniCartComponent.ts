import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class MiniCartComponent extends BasePage {
  readonly miniCartIcon: Locator;
  readonly cartItemCount: Locator;
  readonly miniCartDropdown: Locator;
  readonly cartItems: Locator;
  readonly viewCartLink: Locator;
  readonly checkoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.miniCartIcon = this.page.locator('a[href="/cart"]');
    this.cartItemCount = this.page.locator('.cart-qty');
    this.miniCartDropdown = this.page.locator('.flyout-cart');
    this.cartItems = this.page.locator('.flyout-cart .cart-item');
    this.viewCartLink = this.page.locator('a:has-text("View cart")');
    this.checkoutLink = this.page.locator('a:has-text("Checkout")');
  }

  /**
   * Get cart item count
   */
  async getItemCount(): Promise<number> {
    try {
      if (await this.isVisible(this.cartItemCount)) {
        const text = await this.getText(this.cartItemCount);
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  /**
   * Open mini cart dropdown
   */
  async openMiniCart(): Promise<void> {
    await this.clickElement(this.miniCartIcon);
    await this.page.waitForTimeout(500);
  }

  /**
   * Click view cart link
   */
  async viewCart(): Promise<void> {
    await this.openMiniCart();
    if (await this.isVisible(this.viewCartLink)) {
      await this.clickElement(this.viewCartLink);
      await this.waitForPageLoad();
    }
  }

  /**
   * Click checkout link
   */
  async proceedToCheckout(): Promise<void> {
    await this.openMiniCart();
    if (await this.isVisible(this.checkoutLink)) {
      await this.clickElement(this.checkoutLink);
      await this.waitForPageLoad();
    }
  }
}
