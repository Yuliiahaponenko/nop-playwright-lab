import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class ProductListPage extends BasePage {
  readonly productGrid: Locator;
  readonly productItems: Locator;
  readonly productCount: Locator;
  readonly sortDropdown: Locator;
  readonly viewModeGrid: Locator;
  readonly viewModeList: Locator;
  readonly pageSizeDropdown: Locator;
  readonly priceFilterMin: Locator;
  readonly priceFilterMax: Locator;
  readonly filterButton: Locator;
  readonly clearFilterButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productGrid = page.locator('.product-grid');
    this.productItems = page.locator('.product-item');
    this.productCount = page.locator('.product-count');
    this.sortDropdown = page.locator('#products-orderby');
    this.viewModeGrid = page.locator('.viewmode-icon.grid');
    this.viewModeList = page.locator('.viewmode-icon.list');
    this.pageSizeDropdown = page.locator('#products-pagesize');
    this.priceFilterMin = page.locator('#PriceFrom');
    this.priceFilterMax = page.locator('#PriceTo');
    this.filterButton = page.locator('button:has-text("Filter")');
    this.clearFilterButton = page.locator('button:has-text("Clear")');
  }

  /**
   * Navigate to a category page
   */
  async gotoCategory(categoryName: string): Promise<void> {
    await this.navigate(`/${categoryName.toLowerCase()}`);
    await this.waitForPageLoad();
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    if (await this.isVisible(this.productCount)) {
      const text = await this.getText(this.productCount);
      const match = text.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }
    return (await this.productItems.count());
  }

  /**
   * Click on a product by index
   */
  async clickProduct(index: number): Promise<void> {
    const product = this.productItems.nth(index);
    await this.clickElement(product.locator('.product-title a'));
  }

  /**
   * Click on a product by name
   */
  async clickProductByName(productName: string): Promise<void> {
    const product = this.productItems.filter({ hasText: productName }).first();
    await this.clickElement(product.locator('.product-title a'));
  }

  /**
   * Add product to cart by index
   */
  async addProductToCart(index: number): Promise<void> {
    const product = this.productItems.nth(index);
    const addToCartButton = product.locator('button:has-text("Add to cart")');
    await this.clickElement(addToCartButton);
  }

  /**
   * Apply price filter
   */
  async applyPriceFilter(minPrice: string, maxPrice: string): Promise<void> {
    await this.fillInput(this.priceFilterMin, minPrice);
    await this.fillInput(this.priceFilterMax, maxPrice);
    await this.clickElement(this.filterButton);
    await this.waitForPageLoad();
  }

  /**
   * Clear filters
   */
  async clearFilters(): Promise<void> {
    if (await this.isVisible(this.clearFilterButton)) {
      await this.clickElement(this.clearFilterButton);
      await this.waitForPageLoad();
    }
  }

  /**
   * Sort products
   */
  async sortProducts(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
    await this.waitForPageLoad();
  }

  /**
   * Verify search results contain keyword
   */
  async verifySearchResults(keyword: string): Promise<void> {
    const count = await this.getProductCount();
    if (count === 0) {
      throw new Error('No products found in search results');
    }
    // Verify at least one product contains the keyword
    const firstProduct = this.productItems.first();
    const productText = await this.getText(firstProduct);
    if (!productText.toLowerCase().includes(keyword.toLowerCase())) {
      // Check if keyword is in product names
      const productNames = await this.productItems.locator('.product-title').allTextContents();
      const hasKeyword = productNames.some(name => 
        name.toLowerCase().includes(keyword.toLowerCase())
      );
      if (!hasKeyword) {
        throw new Error(`No products found containing keyword: ${keyword}`);
      }
    }
  }
}
