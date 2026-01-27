import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productSku: Locator;
  readonly productPrice: Locator;
  readonly productImages: Locator;
  readonly mainImage: Locator;
  readonly productDescription: Locator;
  readonly productSpecifications: Locator;
  readonly stockAvailability: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly quantityInput: Locator;
  readonly quantityIncreaseButton: Locator;
  readonly quantityDecreaseButton: Locator;
  readonly breadcrumb: Locator;

  // Product options (for configurable products)
  readonly colorOptions: Locator;
  readonly sizeOptions: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-name h1');
    this.productSku = page.locator('.sku');
    this.productPrice = page.locator('.product-price span');
    this.productImages = page.locator('.picture-gallery img');
    this.mainImage = page.locator('.picture img');
    this.productDescription = page.locator('.full-description');
    this.productSpecifications = page.locator('.product-specs-box');
    this.stockAvailability = page.locator('.stock');
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.addToWishlistButton = page.locator('#add-to-wishlist-button');
    this.quantityInput = page.locator('#product_enteredQuantity');
    this.quantityIncreaseButton = page.locator('.qty-input .plus');
    this.quantityDecreaseButton = page.locator('.qty-input .minus');
    this.breadcrumb = page.locator('.breadcrumb');

    // Product options
    this.colorOptions = page.locator('input[type="radio"][name*="Color"]');
    this.sizeOptions = page.locator('select[name*="Size"]');
  }

  /**
   * Navigate to product detail page by product ID
   */
  async gotoProduct(productId: number): Promise<void> {
    await this.navigate(`/product/${productId}`);
    await this.waitForPageLoad();
  }

  /**
   * Get product name
   */
  async getProductName(): Promise<string> {
    return await this.getText(this.productName);
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  /**
   * Get product SKU
   */
  async getProductSku(): Promise<string> {
    return await this.getText(this.productSku);
  }

  /**
   * Set product quantity
   */
  async setQuantity(quantity: number): Promise<void> {
    await this.fillInput(this.quantityInput, quantity.toString());
  }

  /**
   * Select product color (if configurable)
   */
  async selectColor(colorValue: string): Promise<void> {
    const colorOption = this.colorOptions.filter({ hasText: colorValue }).first();
    if (await this.isVisible(colorOption)) {
      await this.clickElement(colorOption);
    }
  }

  /**
   * Select product size (if configurable)
   */
  async selectSize(sizeValue: string): Promise<void> {
    if (await this.isVisible(this.sizeOptions)) {
      await this.sizeOptions.selectOption(sizeValue);
    }
  }

  /**
   * Add product to cart
   */
  async addToCart(quantity = 1, options?: { color?: string; size?: string }): Promise<void> {
    if (quantity > 1) {
      await this.setQuantity(quantity);
    }
    if (options?.color) {
      await this.selectColor(options.color);
    }
    if (options?.size) {
      await this.selectSize(options.size);
    }
    await this.clickElement(this.addToCartButton);
    // Wait for success notification
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verify product details are displayed
   */
  async verifyProductDetails(): Promise<void> {
    const name = await this.getProductName();
    if (!name) {
      throw new Error('Product name is not displayed');
    }
    const price = await this.getProductPrice();
    if (!price) {
      throw new Error('Product price is not displayed');
    }
  }

  /**
   * Verify stock availability
   */
  async verifyStockAvailability(): Promise<void> {
    if (await this.isVisible(this.stockAvailability)) {
      const stockText = await this.getText(this.stockAvailability);
      if (stockText.toLowerCase().includes('out of stock')) {
        throw new Error('Product is out of stock');
      }
    }
  }
}
