import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';

test.describe('Registered User Checkout Tests', () => {
  test.beforeEach(async ({ page, homePage, loginPage, productListPage, productDetailPage }) => {
    // Pre-condition: Login as registered user
    await homePage.goto();
    await homePage.clickLogin();
    const userData = TestData.getValidTestUser();
    await loginPage.login(userData.email, userData.password);
    await homePage.verifyUserLoggedIn();

    // Add product to cart
    await productListPage.gotoCategory('computers');
    await productListPage.clickProduct(0);
    await productDetailPage.addToCart(1);
    await page.waitForTimeout(2000);
  });

  test('TC-CHECKOUT-002: Complete checkout as registered user', async ({
    page,
    shoppingCartPage,
    checkoutPage,
    orderConfirmationPage,
  }) => {
    // Navigate to cart and proceed to checkout
    await shoppingCartPage.goto();
    await shoppingCartPage.proceedToCheckout();

    // Verify billing address pre-filled (if available)
    // Continue through checkout steps
    const paymentInfo = TestData.generateCreditCard();

    // Fill billing address if needed (may be pre-filled)
    const billingAddress = TestData.generateAddress();
    await checkoutPage.fillBillingAddress(billingAddress);
    await checkoutPage.continueBillingAddress();

    // Select shipping method
    await checkoutPage.selectShippingMethod('Ground');
    await checkoutPage.continueShippingMethod();

    // Select payment method
    await checkoutPage.selectPaymentMethod('Payments.Manual');
    await checkoutPage.continuePaymentMethod();

    // Fill payment information
    await checkoutPage.fillPaymentInfo(paymentInfo);
    await checkoutPage.continuePaymentInfo();

    // Confirm order
    await checkoutPage.confirmOrder();

    // Verify order confirmation
    await orderConfirmationPage.verifyOrderConfirmation();
    await orderConfirmationPage.verifyOrderNumber();
  });

  test('TC-CHECKOUT-002: Verify order in account after checkout', async ({
    page,
    shoppingCartPage,
    checkoutPage,
    orderConfirmationPage,
    myAccountPage,
  }) => {
    await shoppingCartPage.goto();
    await shoppingCartPage.proceedToCheckout();

    const paymentInfo = TestData.generateCreditCard();
    const billingAddress = TestData.generateAddress();

    await checkoutPage.fillBillingAddress(billingAddress);
    await checkoutPage.continueBillingAddress();
    await checkoutPage.selectShippingMethod('Ground');
    await checkoutPage.continueShippingMethod();
    await checkoutPage.selectPaymentMethod('Payments.Manual');
    await checkoutPage.continuePaymentMethod();
    await checkoutPage.fillPaymentInfo(paymentInfo);
    await checkoutPage.continuePaymentInfo();
    await checkoutPage.confirmOrder();

    // Get order number
    const orderNumber = await orderConfirmationPage.getOrderNumber();

    // Navigate to My Account -> Orders
    await myAccountPage.gotoOrders();

    // Verify order in order history
    if (orderNumber) {
      await myAccountPage.verifyOrderInHistory(orderNumber);
    }
  });
});
