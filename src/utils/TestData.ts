/**
 * Test Data Generator Utility
 * Generates dynamic test data for test execution
 */

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth?: {
    day: string;
    month: string;
    year: string;
  };
}

export interface CreditCardData {
  cardNumber: string;
  cardHolder: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
}

export interface AddressData {
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

export class TestData {
  /**
   * Generate unique user data
   */
  static generateUserData(): UserData {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return {
      firstName: `Test${timestamp}`,
      lastName: `User${random}`,
      email: `test${timestamp}${random}@example.com`,
      password: 'Test123!@#',
      phone: `555${random.toString().padStart(7, '0')}`,
      dateOfBirth: {
        day: '15',
        month: '5',
        year: '1990',
      },
    };
  }

  /**
   * Generate test credit card data
   */
  static generateCreditCard(): CreditCardData {
    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + 2;
    return {
      cardNumber: '4111111111111111', // Test card number
      cardHolder: 'Test User',
      expirationMonth: '12',
      expirationYear: futureYear.toString(),
      cvv: '123',
    };
  }

  /**
   * Generate billing/shipping address
   */
  static generateAddress(): AddressData {
    const timestamp = Date.now();
    return {
      firstName: `John${timestamp}`,
      lastName: `Doe${timestamp}`,
      email: `billing${timestamp}@example.com`,
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      address1: `123 Test Street ${timestamp}`,
      zipCode: '90001',
      phoneNumber: '5551234567',
      company: 'Test Company',
    };
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static generateEmail(prefix = 'test'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}${timestamp}${random}@example.com`;
  }

  /**
   * Generate random phone number
   */
  static generatePhoneNumber(): string {
    const random = Math.floor(Math.random() * 10000000);
    return `555${random.toString().padStart(7, '0')}`;
  }

  /**
   * Get valid test user credentials (if stored)
   */
  static getValidTestUser(): UserData {
    return {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      password: 'Test123!',
      phone: '5551234567',
    };
  }
}
