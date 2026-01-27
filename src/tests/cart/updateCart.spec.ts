import { test, expect } from '../../fixtures/test.fixture';

test.describe('Update Cart Tests', () => {
  test.beforeEach(async ({ page, productListPage, productDetailPage }) => {
    // Pre-condition: Add product to cart
    await productListPage.gotoCategory('computers');
    await productListPage.clickProduct(0);
    await productDetailPage.addToCart(1);
    await page.waitForTimeout(2000);
  });

  test('TC-CART-003: Update cart quantity', async ({
    page,
    shoppingCartPage,
  }) => {
    // Navigate to shopping cart page
    await shoppingCartPage.goto();

    // Get initial subtotal
    const initialSubtotal = await shoppingCartPage.getSubtotal();

    // Update quantity from 1 to 3
    await shoppingCartPage.updateQuantity(0, 3);

    // Verify quantity updated
    const quantityInput = shoppingCartPage.getQuantityInput(0);
    const quantityValue = await quantityInput.inputValue();
    expect(quantityValue).toBe('3');

    // Verify subtotal recalculated
    const newSubtotal = await shoppingCartPage.getSubtotal();
    expect(newSubtotal).not.toBe(initialSubtotal);
  });

  test('TC-CART-003: Update quantity to 0 should remove item', async ({
    page,
    shoppingCartPage,
  }) => {
    await shoppingCartPage.goto();

    // Update quantity to 0
    await shoppingCartPage.updateQuantity(0, 0);

    // Verify cart is empty or item removed
    const itemCount = await shoppingCartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });
});
