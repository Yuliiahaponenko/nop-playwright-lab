import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';

test.describe('Guest Purchase Flow - E2E Tests', () => {
  test('TC-E2E-002: Complete guest user purchase flow', async ({
    page,
    homePage,
    productListPage,
    productDetailPage,
    shoppingCartPage,
    checkoutPage,
    orderConfirmationPage,
    myAccountPage,
  }) => {
    // Step 1: Start as guest user (not logged in)
    await homePage.goto();
    await homePage.verifyUserLoggedOut();

    // Step 2: Search for product
    await homePage.searchProduct('laptop');
    await productListPage.verifySearchResults('laptop');

    // Step 3: Add multiple products to cart
    const productCount = await productListPage.getProductCount();
    if (productCount > 0) {
      await productListPage.addProductToCart(0);
      await page.waitForTimeout(2000);
    }

    if (productCount > 1) {
      await productListPage.gotoCategory('computers');
      await productListPage.addProductToCart(1);
      await page.waitForTimeout(2000);
    }

    // Step 4: Update cart (change quantities)
    await shoppingCartPage.goto();
    await shoppingCartPage.verifyCartHasItems();
    if ((await shoppingCartPage.getCartItemCount()) > 0) {
      await shoppingCartPage.updateQuantity(0, 2);
    }

    // Step 5: Proceed to checkout as guest
    await shoppingCartPage.proceedToCheckout();
    await checkoutPage.checkoutAsGuest();

    // Step 6: Complete all checkout steps
    const billingAddress = TestData.generateAddress();
    const paymentInfo = TestData.generateCreditCard();

    await checkoutPage.completeGuestCheckout(
      billingAddress,
      'Ground',
      'Payments.Manual',
      paymentInfo
    );

    // Step 7: Verify order confirmation
    await orderConfirmationPage.verifyOrderConfirmation();
    const orderNumber = await orderConfirmationPage.getOrderNumber();
    expect(orderNumber).toBeTruthy();

    // Step 8: Verify guest cannot access My Account
    await myAccountPage.goto();
    // Should be redirected to login page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain('/login');
  });
});
