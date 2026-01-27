import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class SearchComponent extends BasePage {
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly advancedSearchLink: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = this.page.locator('#small-searchterms');
    this.searchButton = this.page.locator('button[type="submit"].search-box-button');
    this.advancedSearchLink = this.page.locator('a:has-text("Advanced search")');
    this.searchResults = this.page.locator('.search-results');
  }

  /**
   * Search for a keyword
   */
  async search(keyword: string): Promise<void> {
    await this.fillInput(this.searchBox, keyword);
    await this.clickElement(this.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * Search by pressing Enter
   */
  async searchWithEnter(keyword: string): Promise<void> {
    await this.fillInput(this.searchBox, keyword);
    await this.searchBox.press('Enter');
    await this.waitForPageLoad();
  }

  /**
   * Clear search box
   */
  async clearSearch(): Promise<void> {
    await this.searchBox.clear();
  }
}
