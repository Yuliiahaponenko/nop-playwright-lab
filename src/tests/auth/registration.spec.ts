import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';

test.describe('User Registration Tests', () => {
  test('TC-AUTH-001: Register new user successfully', async ({
    page,
    registerPage,
    homePage,
  }) => {
    // Generate unique test data
    const userData = TestData.generateUserData();

    // Navigate to registration page
    await registerPage.goto();

    // Fill registration form
    await registerPage.register({
      gender: 'male',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      dateOfBirth: userData.dateOfBirth,
    });

    // Verify registration success
    await registerPage.verifyRegistrationSuccess();

    // Verify user logged in
    await homePage.verifyUserLoggedIn(userData.email);
  });

  test('TC-AUTH-001: Register new user with female gender', async ({
    page,
    registerPage,
    homePage,
  }) => {
    const userData = TestData.generateUserData();

    await registerPage.goto();

    await registerPage.register({
      gender: 'female',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    });

    await registerPage.verifyRegistrationSuccess();
    await homePage.verifyUserLoggedIn(userData.email);
  });

  test('TC-AUTH-001: Register with newsletter subscription', async ({
    page,
    registerPage,
    homePage,
  }) => {
    const userData = TestData.generateUserData();

    await registerPage.goto();

    await registerPage.register({
      gender: 'male',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      newsletter: true,
    });

    await registerPage.verifyRegistrationSuccess();
    await homePage.verifyUserLoggedIn(userData.email);
  });
});
