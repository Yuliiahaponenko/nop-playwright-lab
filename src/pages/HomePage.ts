import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class HomePage extends BasePage {
  // Header elements
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly accountLink: Locator;
  readonly cartLink: Locator;
  readonly wishlistLink: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  // Footer elements
  readonly footer: Locator;

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
    this.footer = page.locator('footer');
  }

  /**
   * Navigate to homepage
   */
  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  /**
   * Click on Register link
   */
  async clickRegister(): Promise<void> {
    await this.clickElement(this.registerLink);
  }

  /**
   * Click on Login link
   */
  async clickLogin(): Promise<void> {
    await this.clickElement(this.loginLink);
  }

  /**
   * Click on Logout link
   */
  async clickLogout(): Promise<void> {
    await this.clickElement(this.logoutLink);
  }

  /**
   * Verify user is logged in
   */
  async verifyUserLoggedIn(email?: string): Promise<void> {
    const accountLinkVisible = await this.isVisible(this.accountLink);
    if (!accountLinkVisible) {
      throw new Error('User is not logged in - account link not visible');
    }
    if (email) {
      const accountText = await this.getText(this.accountLink);
      if (!accountText.includes(email)) {
        throw new Error(`Expected email ${email} not found in account link`);
      }
    }
  }

  /**
   * Verify user is logged out
   */
  async verifyUserLoggedOut(): Promise<void> {
    const loginLinkVisible = await this.isVisible(this.loginLink);
    if (!loginLinkVisible) {
      throw new Error('User is still logged in - login link not visible');
    }
  }

  /**
   * Search for a product
   */
  async searchProduct(keyword: string): Promise<void> {
    await this.fillInput(this.searchBox, keyword);
    await this.clickElement(this.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * Get cart item count from mini cart
   */
  async getCartItemCount(): Promise<number> {
    try {
      const cartCount = this.page.locator('.cart-qty');
      if (await this.isVisible(cartCount)) {
        const text = await this.getText(cartCount);
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      }
      return 0;
    } catch {
      return 0;
    }
  }
}
