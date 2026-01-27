import { test, expect } from '../../fixtures/test.fixture';

test.describe('Remove from Cart Tests', () => {
  test.beforeEach(async ({ page, productListPage, productDetailPage }) => {
    // Pre-condition: Add multiple products to cart
    await productListPage.gotoCategory('computers');
    
    // Add first product
    await productListPage.clickProduct(0);
    await productDetailPage.addToCart(1);
    await page.waitForTimeout(2000);

    // Add second product if available
    await productListPage.gotoCategory('computers');
    const productCount = await productListPage.getProductCount();
    if (productCount > 1) {
      await productListPage.clickProduct(1);
      await productDetailPage.addToCart(1);
      await page.waitForTimeout(2000);
    }
  });

  test('TC-CART-004: Remove product from cart', async ({
    page,
    shoppingCartPage,
  }) => {
    // Navigate to cart page
    await shoppingCartPage.goto();

    // Get initial item count
    const initialCount = await shoppingCartPage.getCartItemCount();
    expect(initialCount).toBeGreaterThan(0);

    // Remove first item
    await shoppingCartPage.removeItem(0);

    // Verify product removed
    const newCount = await shoppingCartPage.getCartItemCount();
    expect(newCount).toBe(initialCount - 1);
  });

  test('TC-CART-004: Remove all products from cart', async ({
    page,
    shoppingCartPage,
  }) => {
    await shoppingCartPage.goto();

    // Remove all items
    await shoppingCartPage.removeAllItems();

    // Verify empty cart message
    await shoppingCartPage.verifyCartIsEmpty();
  });
});
