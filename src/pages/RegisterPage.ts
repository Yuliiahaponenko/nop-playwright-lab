import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export interface UserData {
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  dateOfBirth?: {
    day: string;
    month: string;
    year: string;
  };
  email: string;
  password: string;
  confirmPassword?: string;
  companyName?: string;
  newsletter?: boolean;
}

export class RegisterPage extends BasePage {
  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthDay: Locator;
  readonly dateOfBirthMonth: Locator;
  readonly dateOfBirthYear: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly companyNameInput: Locator;
  readonly newsletterCheckbox: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page);
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.dateOfBirthDay = page.locator('select[name="DateOfBirthDay"]');
    this.dateOfBirthMonth = page.locator('select[name="DateOfBirthMonth"]');
    this.dateOfBirthYear = page.locator('select[name="DateOfBirthYear"]');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.companyNameInput = page.locator('#Company');
    this.newsletterCheckbox = page.locator('#Newsletter');
    this.registerButton = page.locator('#register-button');
    this.successMessage = page.locator('.result');
    this.errorMessage = page.locator('.message-error');
    this.validationErrors = page.locator('.validation-summary-errors');
  }

  /**
   * Navigate to registration page
   */
  async goto(): Promise<void> {
    await this.navigate('/register');
    await this.waitForPageLoad();
  }

  /**
   * Fill registration form
   */
  async fillRegistrationForm(userData: UserData): Promise<void> {
    // Select gender
    if (userData.gender === 'male') {
      await this.clickElement(this.genderMale);
    } else {
      await this.clickElement(this.genderFemale);
    }

    // Fill name fields
    await this.fillInput(this.firstNameInput, userData.firstName);
    await this.fillInput(this.lastNameInput, userData.lastName);

    // Fill date of birth if provided
    if (userData.dateOfBirth) {
      await this.dateOfBirthDay.selectOption(userData.dateOfBirth.day);
      await this.dateOfBirthMonth.selectOption(userData.dateOfBirth.month);
      await this.dateOfBirthYear.selectOption(userData.dateOfBirth.year);
    }

    // Fill email
    await this.fillInput(this.emailInput, userData.email);

    // Fill password
    await this.fillInput(this.passwordInput, userData.password);
    await this.fillInput(
      this.confirmPasswordInput,
      userData.confirmPassword || userData.password
    );

    // Fill company name if provided
    if (userData.companyName) {
      await this.fillInput(this.companyNameInput, userData.companyName);
    }

    // Newsletter subscription
    if (userData.newsletter !== undefined) {
      const isChecked = await this.newsletterCheckbox.isChecked();
      if (userData.newsletter && !isChecked) {
        await this.clickElement(this.newsletterCheckbox);
      } else if (!userData.newsletter && isChecked) {
        await this.clickElement(this.newsletterCheckbox);
      }
    }
  }

  /**
   * Submit registration form
   */
  async submitRegistration(): Promise<void> {
    await this.clickElement(this.registerButton);
    await this.waitForPageLoad();
  }

  /**
   * Register a new user (fill form and submit)
   */
  async register(userData: UserData): Promise<void> {
    await this.fillRegistrationForm(userData);
    await this.submitRegistration();
  }

  /**
   * Verify registration success
   */
  async verifyRegistrationSuccess(): Promise<void> {
    const isVisible = await this.isVisible(this.successMessage);
    if (!isVisible) {
      throw new Error('Registration success message is not displayed');
    }
    const message = await this.getText(this.successMessage);
    if (!message.includes('Your registration completed')) {
      throw new Error(`Expected success message not found. Got: "${message}"`);
    }
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage);
    }
    return '';
  }
}
