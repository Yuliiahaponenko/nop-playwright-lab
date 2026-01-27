import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';

test.describe('Complete User Journey - E2E Tests', () => {
  test('TC-E2E-001: Complete user journey from registration to order completion', async ({
    page,
    homePage,
    registerPage,
    loginPage,
    productListPage,
    productDetailPage,
    shoppingCartPage,
    checkoutPage,
    orderConfirmationPage,
    myAccountPage,
  }) => {
    // Step 1: Register new user account
    const userData = TestData.generateUserData();
    await registerPage.goto();
    await registerPage.register({
      gender: 'male',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    });
    await registerPage.verifyRegistrationSuccess();
    await homePage.verifyUserLoggedIn(userData.email);

    // Step 2: Browse products by category
    await productListPage.gotoCategory('computers');
    const productCount = await productListPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // Step 3: Search for specific product
    await homePage.goto();
    await homePage.searchProduct('laptop');
    await productListPage.verifySearchResults('laptop');

    // Step 4: View product details
    await productListPage.clickProduct(0);
    await productDetailPage.verifyProductDetails();

    // Step 5: Add product to cart
    await productDetailPage.addToCart(1);
    await page.waitForTimeout(2000);

    // Step 6: Update cart quantity
    await shoppingCartPage.goto();
    await shoppingCartPage.updateQuantity(0, 2);

    // Step 7: Proceed to checkout
    await shoppingCartPage.proceedToCheckout();

    // Step 8: Complete checkout
    const billingAddress = TestData.generateAddress();
    billingAddress.email = userData.email; // Use registered email
    const paymentInfo = TestData.generateCreditCard();

    await checkoutPage.fillBillingAddress(billingAddress);
    await checkoutPage.continueBillingAddress();
    await checkoutPage.selectShippingMethod('Ground');
    await checkoutPage.continueShippingMethod();
    await checkoutPage.selectPaymentMethod('Payments.Manual');
    await checkoutPage.continuePaymentMethod();
    await checkoutPage.fillPaymentInfo(paymentInfo);
    await checkoutPage.continuePaymentInfo();
    await checkoutPage.confirmOrder();

    // Step 9: Verify order confirmation
    await orderConfirmationPage.verifyOrderConfirmation();
    const orderNumber = await orderConfirmationPage.getOrderNumber();
    expect(orderNumber).toBeTruthy();

    // Step 10: Navigate to My Account
    await myAccountPage.goto();

    // Step 11: Verify order in order history
    await myAccountPage.gotoOrders();
    if (orderNumber) {
      await myAccountPage.verifyOrderInHistory(orderNumber);
    }

    // Step 12: Logout
    await homePage.goto();
    await homePage.clickLogout();
    await homePage.verifyUserLoggedOut();
  });
});
