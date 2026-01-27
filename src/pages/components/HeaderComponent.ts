import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HeaderComponent extends BasePage {
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly accountLink: Locator;
  readonly cartLink: Locator;
  readonly wishlistLink: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly miniCart: Locator;
  readonly cartItemCount: Locator;

  constructor(page: Page) {
    super(page);
    this.registerLink = page.locator('a[href="/register"]');
    this.loginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.accountLink = page.locator('a[href="/customer/info"]');
    this.cartLink = page.locator('a[href="/cart"]');
    this.wishlistLink = page.locator('a[href="/wishlist"]');
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('button[type="submit"].search-box-button');
    this.miniCart = page.locator('.cart-qty');
    this.cartItemCount = page.locator('.cart-qty');
  }

  /**
   * Get cart item count from mini cart
   */
  async getCartItemCount(): Promise<number> {
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
   * Verify user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.accountLink);
  }

  /**
   * Verify user is logged out
   */
  async isUserLoggedOut(): Promise<boolean> {
    return await this.isVisible(this.loginLink);
  }
}
