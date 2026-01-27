import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class MyAccountPage extends BasePage {
  readonly customerInfoLink: Locator;
  readonly ordersLink: Locator;
  readonly addressBookLink: Locator;
  readonly changePasswordLink: Locator;
  readonly downloadProductsLink: Locator;
  readonly backInStockLink: Locator;
  readonly rewardPointsLink: Locator;
  readonly returnRequestsLink: Locator;
  readonly myProductReviewsLink: Locator;

  // Customer info
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly saveInfoButton: Locator;
  readonly successMessage: Locator;

  // Orders
  readonly orderHistoryTable: Locator;
  readonly orderRows: Locator;
  readonly orderDetailsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.customerInfoLink = page.locator('a[href="/customer/info"]');
    this.ordersLink = page.locator('a[href="/customer/orders"]');
    this.addressBookLink = page.locator('a[href="/customer/addresses"]');
    this.changePasswordLink = page.locator('a[href="/customer/changepassword"]');
    this.downloadProductsLink = page.locator('a[href="/customer/downloadableproducts"]');
    this.backInStockLink = page.locator('a[href="/customer/backinstocksubscriptions"]');
    this.rewardPointsLink = page.locator('a[href="/customer/rewardpoints"]');
    this.returnRequestsLink = page.locator('a[href="/customer/returnrequests"]');
    this.myProductReviewsLink = page.locator('a[href="/customer/productreviews"]');

    // Customer info
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.saveInfoButton = page.locator('button:has-text("Save")');
    this.successMessage = page.locator('.result');

    // Orders
    this.orderHistoryTable = page.locator('.order-list');
    this.orderRows = page.locator('.order-list tbody tr');
    this.orderDetailsLink = page.locator('a:has-text("Details")');
  }

  /**
   * Navigate to My Account page
   */
  async goto(): Promise<void> {
    await this.navigate('/customer/info');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to Orders page
   */
  async gotoOrders(): Promise<void> {
    await this.clickElement(this.ordersLink);
    await this.waitForPageLoad();
  }

  /**
   * Get order count
   */
  async getOrderCount(): Promise<number> {
    return await this.orderRows.count();
  }

  /**
   * Get order details by index
   */
  async getOrderDetails(index: number): Promise<{
    orderNumber: string;
    orderDate: string;
    orderStatus: string;
    orderTotal: string;
  }> {
    const row = this.orderRows.nth(index);
    const orderNumber = await this.getText(row.locator('td').nth(0));
    const orderDate = await this.getText(row.locator('td').nth(1));
    const orderStatus = await this.getText(row.locator('td').nth(2));
    const orderTotal = await this.getText(row.locator('td').nth(3));

    return {
      orderNumber,
      orderDate,
      orderStatus,
      orderTotal,
    };
  }

  /**
   * Click order details by index
   */
  async clickOrderDetails(index: number): Promise<void> {
    const row = this.orderRows.nth(index);
    const detailsLink = row.locator('a:has-text("Details")');
    await this.clickElement(detailsLink);
    await this.waitForPageLoad();
  }

  /**
   * Verify order is in order history
   */
  async verifyOrderInHistory(orderNumber: string): Promise<void> {
    const orderCount = await this.getOrderCount();
    for (let i = 0; i < orderCount; i++) {
      const order = await this.getOrderDetails(i);
      if (order.orderNumber.includes(orderNumber)) {
        return;
      }
    }
    throw new Error(`Order ${orderNumber} not found in order history`);
  }

  /**
   * Update customer information
   */
  async updateCustomerInfo(firstName: string, lastName: string, email: string): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.emailInput, email);
    await this.clickElement(this.saveInfoButton);
    await this.waitForPageLoad();
  }

  /**
   * Verify customer info updated successfully
   */
  async verifyInfoUpdated(): Promise<void> {
    const isVisible = await this.isVisible(this.successMessage);
    if (!isVisible) {
      throw new Error('Success message is not displayed after updating customer info');
    }
  }
}
