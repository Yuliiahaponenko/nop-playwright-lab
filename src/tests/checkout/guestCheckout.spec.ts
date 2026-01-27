import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';
import * as testData from '../../data/testData.json';

test.describe('Guest Checkout Tests', () => {
  test.beforeEach(async ({ page, productListPage, productDetailPage }) => {
    // Pre-condition: Add product to cart as guest
    await productListPage.gotoCategory('computers');
    await productListPage.clickProduct(0);
    await productDetailPage.addToCart(1);
    await page.waitForTimeout(2000);
  });

  test('TC-CHECKOUT-001: Complete guest checkout flow', async ({
    page,
    shoppingCartPage,
    checkoutPage,
    orderConfirmationPage,
  }) => {
    // Navigate to cart and proceed to checkout
    await shoppingCartPage.goto();
    await shoppingCartPage.proceedToCheckout();

    // Select checkout as guest
    await checkoutPage.checkoutAsGuest();

    // Generate test data
    const billingAddress = TestData.generateAddress();
    const paymentInfo = TestData.generateCreditCard();

    // Complete checkout flow
    await checkoutPage.completeGuestCheckout(
      billingAddress,
      'Ground', // Shipping method
      'Payments.Manual', // Payment method (adjust based on actual payment method values)
      paymentInfo
    );

    // Verify order confirmation
    await orderConfirmationPage.verifyOrderConfirmation();
    await orderConfirmationPage.verifyOrderNumber();
    await orderConfirmationPage.verifySuccessMessage();

    // Get order number for verification
    const orderNumber = await orderConfirmationPage.getOrderNumber();
    expect(orderNumber).toBeTruthy();
  });

  test('TC-CHECKOUT-001: Verify order details in confirmation', async ({
    page,
    shoppingCartPage,
    checkoutPage,
    orderConfirmationPage,
  }) => {
    await shoppingCartPage.goto();
    await shoppingCartPage.proceedToCheckout();
    await checkoutPage.checkoutAsGuest();

    const billingAddress = TestData.generateAddress();
    const paymentInfo = TestData.generateCreditCard();

    await checkoutPage.completeGuestCheckout(
      billingAddress,
      'Ground',
      'Payments.Manual',
      paymentInfo
    );

    // Verify order details are displayed
    await orderConfirmationPage.verifyOrderConfirmation();
    const orderTotal = await orderConfirmationPage.getOrderTotal();
    expect(orderTotal).toBeTruthy();
  });
});
