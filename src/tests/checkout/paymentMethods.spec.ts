import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';

test.describe('Checkout Validation Tests', () => {
  test.beforeEach(async ({ page, productListPage, productDetailPage }) => {
    // Pre-condition: Add product to cart
    await productListPage.gotoCategory('computers');
    await productListPage.clickProduct(0);
    await productDetailPage.addToCart(1);
    await page.waitForTimeout(2000);
  });

  test('TC-CHECKOUT-003: Verify required fields validation', async ({
    page,
    shoppingCartPage,
    checkoutPage,
  }) => {
    // Navigate to checkout
    await shoppingCartPage.goto();
    await shoppingCartPage.proceedToCheckout();
    await checkoutPage.checkoutAsGuest();

    // Try to continue without filling required fields
    await checkoutPage.continueBillingAddress();

    // Verify validation errors displayed
    await checkoutPage.verifyValidationErrors();
  });

  test('TC-CHECKOUT-003: Verify email format validation', async ({
    page,
    shoppingCartPage,
    checkoutPage,
  }) => {
    await shoppingCartPage.goto();
    await shoppingCartPage.proceedToCheckout();
    await checkoutPage.checkoutAsGuest();

    // Fill form with invalid email
    const invalidAddress = TestData.generateAddress();
    invalidAddress.email = 'invalid-email';

    await checkoutPage.fillBillingAddress(invalidAddress);
    await checkoutPage.continueBillingAddress();

    // Verify validation error for email
    await checkoutPage.verifyValidationErrors();
  });
});
