import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';

test.describe('User Logout Tests', () => {
  test.beforeEach(async ({ page, loginPage, homePage }) => {
    // Pre-condition: Login before each test
    await homePage.goto();
    await homePage.clickLogin();
    const userData = TestData.getValidTestUser();
    await loginPage.login(userData.email, userData.password);
    await homePage.verifyUserLoggedIn();
  });

  test('TC-AUTH-004: Logout successfully', async ({ page, homePage }) => {
    // Verify user is logged in
    await homePage.verifyUserLoggedIn();

    // Click logout link
    await homePage.clickLogout();

    // Verify user logged out
    await homePage.verifyUserLoggedOut();

    // Verify redirected to homepage
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain('/');
  });

  test('TC-AUTH-004: Verify protected pages inaccessible after logout', async ({
    page,
    homePage,
    myAccountPage,
  }) => {
    // Logout
    await homePage.clickLogout();
    await homePage.verifyUserLoggedOut();

    // Attempt to access My Account page
    await myAccountPage.goto();

    // Should be redirected to login page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain('/login');
  });
});
