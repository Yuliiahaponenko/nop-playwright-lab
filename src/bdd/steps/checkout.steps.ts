import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('I am on the checkout page', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.goto('/onepagecheckout', { waitUntil: 'domcontentloaded', timeout: 30000 });
});

When('I proceed to checkout', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.locator('#checkout').click();
  await page.waitForLoadState('domcontentloaded');
});

When('I select {string} as payment method', async function(this: CustomWorld, method: string) {
  const page = await this.getPage();
  await page.locator(`input[value*="${method}"]`).check();
  await page.locator('#payment-method-buttons-container button').click();
  await page.waitForLoadState('domcontentloaded');
});

When('I confirm the order', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.locator('#confirm-order-buttons-container button').click();
  await page.waitForLoadState('domcontentloaded');
});

Then('I should see order confirmation', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.locator('.order-completed').waitFor({ state: 'visible', timeout: 10000 });
});

Then('I should see order number', async function(this: CustomWorld) {
  const page = await this.getPage();
  const orderNumber = page.locator('.order-number');
  await orderNumber.waitFor({ state: 'visible', timeout: 10000 });
  const text = await orderNumber.textContent();
  if (!text || text.trim() === '') {
    throw new Error('Order number is empty');
  }
});
