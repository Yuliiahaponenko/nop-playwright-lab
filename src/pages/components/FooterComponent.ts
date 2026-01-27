import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FooterComponent extends BasePage {
  readonly footer: Locator;
  readonly newsletterEmailInput: Locator;
  readonly newsletterSubscribeButton: Locator;
  readonly newsletterSuccessMessage: Locator;
  readonly footerLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.footer = this.page.locator('footer');
    this.newsletterEmailInput = this.page.locator('#newsletter-email');
    this.newsletterSubscribeButton = this.page.locator('#newsletter-subscribe-button');
    this.newsletterSuccessMessage = this.page.locator('.newsletter-result');
    this.footerLinks = this.page.locator('footer a');
  }

  /**
   * Subscribe to newsletter
   */
  async subscribeToNewsletter(email: string): Promise<void> {
    await this.fillInput(this.newsletterEmailInput, email);
    await this.clickElement(this.newsletterSubscribeButton);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verify newsletter subscription success
   */
  async verifyNewsletterSubscription(): Promise<void> {
    const isVisible = await this.isVisible(this.newsletterSuccessMessage);
    if (!isVisible) {
      throw new Error('Newsletter subscription success message is not displayed');
    }
  }
}
