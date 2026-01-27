import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('button[type="submit"].login-button');
    this.rememberMeCheckbox = page.locator('#RememberMe');
    this.forgotPasswordLink = page.locator('a[href="/passwordrecovery"]');
    this.errorMessage = page.locator('.message-error');
    this.validationErrors = page.locator('.validation-summary-errors');
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string, rememberMe = false): Promise<void> {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    if (rememberMe) {
      await this.clickElement(this.rememberMeCheckbox);
    }
    await this.clickElement(this.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage);
    }
    return '';
  }

  /**
   * Verify error message is displayed
   */
  async verifyErrorMessage(expectedMessage?: string): Promise<void> {
    const isVisible = await this.isVisible(this.errorMessage);
    if (!isVisible) {
      throw new Error('Error message is not displayed');
    }
    if (expectedMessage) {
      const errorText = await this.getErrorMessage();
      if (!errorText.includes(expectedMessage)) {
        throw new Error(`Expected error message "${expectedMessage}" not found. Got: "${errorText}"`);
      }
    }
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
  }
}
