import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';

test.describe('User Login Tests', () => {
  test('TC-AUTH-002: Login with valid credentials', async ({
    loginPage,
    homePage,
  }) => {
    // Navigate to homepage
    await homePage.goto();

    // Click login link
    await homePage.clickLogin();

    // Login with valid credentials (Note: User should be pre-registered)
    const userData = TestData.getValidTestUser();
    await loginPage.login(userData.email, userData.password);

    // Verify user logged in successfully
    await homePage.verifyUserLoggedIn(userData.email);
  });

  test('TC-AUTH-002: Login with remember me checked', async ({
    loginPage,
    homePage,
  }) => {
    await homePage.goto();
    await homePage.clickLogin();

    const userData = TestData.getValidTestUser();
    await loginPage.login(userData.email, userData.password, true);

    await homePage.verifyUserLoggedIn(userData.email);
  });

  test('TC-AUTH-003: Login with invalid email', async ({ loginPage }) => {
    await loginPage.goto();

    // Attempt login with invalid email
    await loginPage.login('invalid@example.com', 'password123');

    // Verify error message displayed
    await loginPage.verifyErrorMessage('Login was unsuccessful');
  });

  test('TC-AUTH-003: Login with invalid password', async ({ loginPage }) => {
    await loginPage.goto();

    const userData = TestData.getValidTestUser();
    // Attempt login with wrong password
    await loginPage.login(userData.email, 'wrongpassword');

    // Verify error message displayed
    await loginPage.verifyErrorMessage('Login was unsuccessful');
  });

  test('TC-AUTH-003: Login with empty credentials', async ({ page, loginPage }) => {
    await loginPage.goto();

    // Attempt login with empty fields
    await loginPage.login('', '');

    // Verify validation errors (browser validation or custom validation)
    // This may vary based on form validation implementation
    const emailInput = loginPage.emailInput;
    const passwordInput = loginPage.passwordInput;

    // Check if fields are required (HTML5 validation)
    const emailRequired = await emailInput.getAttribute('required');
    const passwordRequired = await passwordInput.getAttribute('required');

    // If HTML5 validation is not present, check for custom validation
    if (!emailRequired || !passwordRequired) {
      // Wait a bit and check for error messages
      await page.waitForTimeout(1000);
      const hasErrors = await loginPage.isVisible(loginPage.validationErrors);
      expect(hasErrors || emailRequired || passwordRequired).toBeTruthy();
    }
  });
});
