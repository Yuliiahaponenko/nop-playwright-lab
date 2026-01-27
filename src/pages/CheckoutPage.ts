import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state?: string;
  city: string;
  address1: string;
  zipCode: string;
  phoneNumber: string;
  company?: string;
}

export interface PaymentInfo {
  cardholderName: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cardCode: string;
}

export class CheckoutPage extends BasePage {
  // Guest checkout option
  readonly checkoutAsGuestButton: Locator;
  readonly registerButton: Locator;

  // Billing address
  readonly billingFirstName: Locator;
  readonly billingLastName: Locator;
  readonly billingEmail: Locator;
  readonly billingCountry: Locator;
  readonly billingState: Locator;
  readonly billingCity: Locator;
  readonly billingAddress1: Locator;
  readonly billingZipCode: Locator;
  readonly billingPhoneNumber: Locator;
  readonly billingCompany: Locator;
  readonly shipToSameAddress: Locator;
  readonly billingContinueButton: Locator;

  // Shipping address
  readonly shippingFirstName: Locator;
  readonly shippingLastName: Locator;
  readonly shippingCountry: Locator;
  readonly shippingState: Locator;
  readonly shippingCity: Locator;
  readonly shippingAddress1: Locator;
  readonly shippingZipCode: Locator;
  readonly shippingPhoneNumber: Locator;
  readonly shippingContinueButton: Locator;

  // Shipping method
  readonly shippingMethodOptions: Locator;
  readonly shippingMethodContinueButton: Locator;

  // Payment method
  readonly paymentMethodOptions: Locator;
  readonly paymentMethodContinueButton: Locator;

  // Payment information
  readonly cardholderName: Locator;
  readonly cardNumber: Locator;
  readonly expirationMonth: Locator;
  readonly expirationYear: Locator;
  readonly cardCode: Locator;
  readonly paymentInfoContinueButton: Locator;

  // Confirm order
  readonly confirmOrderButton: Locator;
  readonly orderSummary: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page);
    // Guest checkout
    this.checkoutAsGuestButton = page.locator('input[value="CheckoutAsGuest"]');
    this.registerButton = page.locator('button:has-text("Register")');

    // Billing address
    this.billingFirstName = page.locator('#BillingNewAddress_FirstName');
    this.billingLastName = page.locator('#BillingNewAddress_LastName');
    this.billingEmail = page.locator('#BillingNewAddress_Email');
    this.billingCountry = page.locator('#BillingNewAddress_CountryId');
    this.billingState = page.locator('#BillingNewAddress_StateProvinceId');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingZipCode = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhoneNumber = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingCompany = page.locator('#BillingNewAddress_Company');
    this.shipToSameAddress = page.locator('#ShipToSameAddress');
    this.billingContinueButton = page.locator('button:has-text("Continue"):near(#billing-buttons-container)');

    // Shipping address
    this.shippingFirstName = page.locator('#ShippingNewAddress_FirstName');
    this.shippingLastName = page.locator('#ShippingNewAddress_LastName');
    this.shippingCountry = page.locator('#ShippingNewAddress_CountryId');
    this.shippingState = page.locator('#ShippingNewAddress_StateProvinceId');
    this.shippingCity = page.locator('#ShippingNewAddress_City');
    this.shippingAddress1 = page.locator('#ShippingNewAddress_Address1');
    this.shippingZipCode = page.locator('#ShippingNewAddress_ZipPostalCode');
    this.shippingPhoneNumber = page.locator('#ShippingNewAddress_PhoneNumber');
    this.shippingContinueButton = page.locator('button:has-text("Continue"):near(#shipping-buttons-container)');

    // Shipping method
    this.shippingMethodOptions = page.locator('input[name="shippingoption"]');
    this.shippingMethodContinueButton = page.locator('button:has-text("Continue"):near(#shipping-method-buttons-container)');

    // Payment method
    this.paymentMethodOptions = page.locator('input[name="paymentmethod"]');
    this.paymentMethodContinueButton = page.locator('button:has-text("Continue"):near(#payment-method-buttons-container)');

    // Payment information
    this.cardholderName = page.locator('#CardholderName');
    this.cardNumber = page.locator('#CardNumber');
    this.expirationMonth = page.locator('#ExpireMonth');
    this.expirationYear = page.locator('#ExpireYear');
    this.cardCode = page.locator('#CardCode');
    this.paymentInfoContinueButton = page.locator('button:has-text("Continue"):near(#payment-info-buttons-container)');

    // Confirm order
    this.confirmOrderButton = page.locator('button:has-text("Confirm")');
    this.orderSummary = page.locator('.order-summary-content');
    this.validationErrors = page.locator('.field-validation-error, .validation-summary-errors');
  }

  /**
   * Navigate to checkout page
   */
  async goto(): Promise<void> {
    await this.navigate('/checkout');
    await this.waitForPageLoad();
  }

  /**
   * Select checkout as guest
   */
  async checkoutAsGuest(): Promise<void> {
    if (await this.isVisible(this.checkoutAsGuestButton)) {
      await this.clickElement(this.checkoutAsGuestButton);
      await this.waitForPageLoad();
    }
  }

  /**
   * Fill billing address
   */
  async fillBillingAddress(address: BillingAddress): Promise<void> {
    await this.fillInput(this.billingFirstName, address.firstName);
    await this.fillInput(this.billingLastName, address.lastName);
    await this.fillInput(this.billingEmail, address.email);
    await this.billingCountry.selectOption(address.country);
    
    if (address.state && await this.isVisible(this.billingState)) {
      await this.billingState.selectOption(address.state);
    }
    
    await this.fillInput(this.billingCity, address.city);
    await this.fillInput(this.billingAddress1, address.address1);
    await this.fillInput(this.billingZipCode, address.zipCode);
    await this.fillInput(this.billingPhoneNumber, address.phoneNumber);
    
    if (address.company) {
      await this.fillInput(this.billingCompany, address.company);
    }
  }

  /**
   * Continue from billing address step
   */
  async continueBillingAddress(): Promise<void> {
    await this.clickElement(this.billingContinueButton);
    await this.waitForPageLoad();
  }

  /**
   * Select shipping method
   */
  async selectShippingMethod(methodValue: string): Promise<void> {
    const method = this.shippingMethodOptions.filter({ hasValue: methodValue }).first();
    if (await this.isVisible(method)) {
      await this.clickElement(method);
    } else {
      // Try by label text
      const methodByLabel = this.page.locator(`label:has-text("${methodValue}")`).locator('..').locator('input');
      if (await this.isVisible(methodByLabel)) {
        await this.clickElement(methodByLabel);
      }
    }
  }

  /**
   * Continue from shipping method step
   */
  async continueShippingMethod(): Promise<void> {
    await this.clickElement(this.shippingMethodContinueButton);
    await this.waitForPageLoad();
  }

  /**
   * Select payment method
   */
  async selectPaymentMethod(methodValue: string): Promise<void> {
    const method = this.paymentMethodOptions.filter({ hasValue: methodValue }).first();
    if (await this.isVisible(method)) {
      await this.clickElement(method);
    } else {
      // Try by label text
      const methodByLabel = this.page.locator(`label:has-text("${methodValue}")`).locator('..').locator('input');
      if (await this.isVisible(methodByLabel)) {
        await this.clickElement(methodByLabel);
      }
    }
  }

  /**
   * Continue from payment method step
   */
  async continuePaymentMethod(): Promise<void> {
    await this.clickElement(this.paymentMethodContinueButton);
    await this.waitForPageLoad();
  }

  /**
   * Fill payment information
   */
  async fillPaymentInfo(paymentInfo: PaymentInfo): Promise<void> {
    await this.fillInput(this.cardholderName, paymentInfo.cardholderName);
    await this.fillInput(this.cardNumber, paymentInfo.cardNumber);
    await this.expirationMonth.selectOption(paymentInfo.expirationMonth);
    await this.expirationYear.selectOption(paymentInfo.expirationYear);
    await this.fillInput(this.cardCode, paymentInfo.cardCode);
  }

  /**
   * Continue from payment info step
   */
  async continuePaymentInfo(): Promise<void> {
    await this.clickElement(this.paymentInfoContinueButton);
    await this.waitForPageLoad();
  }

  /**
   * Confirm order
   */
  async confirmOrder(): Promise<void> {
    await this.clickElement(this.confirmOrderButton);
    await this.waitForPageLoad();
  }

  /**
   * Complete guest checkout flow
   */
  async completeGuestCheckout(
    billingAddress: BillingAddress,
    shippingMethod: string,
    paymentMethod: string,
    paymentInfo: PaymentInfo
  ): Promise<void> {
    // Select guest checkout
    await this.checkoutAsGuest();

    // Fill billing address
    await this.fillBillingAddress(billingAddress);
    await this.continueBillingAddress();

    // Select shipping method
    await this.selectShippingMethod(shippingMethod);
    await this.continueShippingMethod();

    // Select payment method
    await this.selectPaymentMethod(paymentMethod);
    await this.continuePaymentMethod();

    // Fill payment information
    await this.fillPaymentInfo(paymentInfo);
    await this.continuePaymentInfo();

    // Confirm order
    await this.confirmOrder();
  }

  /**
   * Verify validation errors are displayed
   */
  async verifyValidationErrors(): Promise<void> {
    const hasErrors = await this.isVisible(this.validationErrors);
    if (!hasErrors) {
      throw new Error('Validation errors are not displayed');
    }
  }
}
