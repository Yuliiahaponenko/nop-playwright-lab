import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('I have an empty cart', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.goto('/cart', { waitUntil: 'domcontentloaded', timeout: 30000 });
  const removeButtons = page.locator('.remove-from-cart');
  const count = await removeButtons.count();
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      await removeButtons.nth(i).check();
    }
    await page.locator('button[name="updatecart"]').click();
    await page.waitForLoadState('domcontentloaded');
  }
});

When('I add product to cart', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.locator('button.add-to-cart-button').first().click();
  await page.waitForLoadState('domcontentloaded');
});

When('I remove item from cart', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.locator('.remove-from-cart').first().check();
  await page.locator('button[name="updatecart"]').click();
  await page.waitForLoadState('domcontentloaded');
});

Then('my cart should be empty', async function(this: CustomWorld) {
  const page = await this.getPage();
  const emptyMessage = page.locator('.no-data, .order-summary-content:has-text("Your Shopping Cart is empty")');
  await emptyMessage.waitFor({ state: 'visible', timeout: 10000 });
});

Then('my cart should contain {int} item(s)', async function(this: CustomWorld, count: number) {
  const page = await this.getPage();
  const cartItems = page.locator('.cart-item-row');
  const actualCount = await cartItems.count();
  if (actualCount !== count) {
    throw new Error(`Expected cart to have ${count} items, but found ${actualCount}`);
  }
});
