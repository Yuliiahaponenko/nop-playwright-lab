import { test, expect } from '../../fixtures/test.fixture';

test.describe('Add to Cart Tests', () => {
  test('TC-CART-001: Add product to cart from product list', async ({
    page,
    homePage,
    productListPage,
    shoppingCartPage,
    miniCartComponent,
  }) => {
    // Navigate to product list page
    await productListPage.gotoCategory('computers');

    // Get initial cart count
    const initialCartCount = await miniCartComponent.getItemCount();

    // Add product to cart
    await productListPage.addProductToCart(0);

    // Wait for success notification
    await page.waitForTimeout(2000);

    // Verify mini cart updates
    const newCartCount = await miniCartComponent.getItemCount();
    expect(newCartCount).toBe(initialCartCount + 1);

    // Navigate to cart page
    await shoppingCartPage.goto();

    // Verify product added to cart
    await shoppingCartPage.verifyCartHasItems(1);

    // Verify product details
    const productName = await shoppingCartPage.getProductName(0);
    expect(productName).toBeTruthy();
  });

  test('TC-CART-002: Add product to cart from product detail page', async ({
    page,
    productListPage,
    productDetailPage,
    shoppingCartPage,
    miniCartComponent,
  }) => {
    // Navigate to product detail page
    await productListPage.gotoCategory('computers');
    await productListPage.clickProduct(0);

    // Get initial cart count
    const initialCartCount = await miniCartComponent.getItemCount();

    // Add product to cart with quantity 2
    await productDetailPage.addToCart(2);

    // Wait for success notification
    await page.waitForTimeout(2000);

    // Verify mini cart updates
    const newCartCount = await miniCartComponent.getItemCount();
    expect(newCartCount).toBeGreaterThan(initialCartCount);

    // Navigate to cart page
    await shoppingCartPage.goto();

    // Verify product with correct quantity
    await shoppingCartPage.verifyCartHasItems();
  });

  test('TC-CART-002: Add configurable product with options', async ({
    page,
    productListPage,
    productDetailPage,
    shoppingCartPage,
  }) => {
    // Navigate to a product that has options (if available)
    await productListPage.gotoCategory('computers');
    await productListPage.clickProduct(0);

    // Try to add with options (if product has options)
    const hasColorOptions = await productDetailPage.isVisible(
      productDetailPage.colorOptions
    );
    const hasSizeOptions = await productDetailPage.isVisible(
      productDetailPage.sizeOptions
    );

    if (hasColorOptions || hasSizeOptions) {
      const options: { color?: string; size?: string } = {};
      if (hasColorOptions) {
        // Select first available color
        const firstColor = productDetailPage.colorOptions.first();
        const colorValue = await firstColor.getAttribute('value');
        if (colorValue) options.color = colorValue;
      }
      if (hasSizeOptions) {
        // Select first available size
        const sizeOptions = await productDetailPage.sizeOptions.locator('option').all();
        if (sizeOptions.length > 1) {
          // Skip first option (usually "Please select")
          const sizeValue = await sizeOptions[1].getAttribute('value');
          if (sizeValue) options.size = sizeValue;
        }
      }

      await productDetailPage.addToCart(1, options);
      await page.waitForTimeout(2000);

      // Verify product added with options
      await shoppingCartPage.goto();
      await shoppingCartPage.verifyCartHasItems();
    } else {
      // If no options, just add normally
      await productDetailPage.addToCart(1);
      await page.waitForTimeout(2000);
      await shoppingCartPage.goto();
      await shoppingCartPage.verifyCartHasItems();
    }
  });
});
