import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import config from '../support/env';

Given('I am on the login page', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.goto(`${config.baseUrl}/login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
});

Given('I am logged in as a test user', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.goto(`${config.baseUrl}/login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.locator('#Email').fill(config.testUser.email);
  await page.locator('#Password').fill(config.testUser.password);
  await page.locator('button[type="submit"].login-button').click();
  await page.locator('a[href="/customer/info"]').waitFor({ state: 'visible', timeout: 10000 });
});

When('I log out', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.locator('a[href="/logout"]').click();
});

Then('I should be logged in', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.locator('a[href="/customer/info"]').waitFor({ state: 'visible', timeout: 10000 });
});

Then('I should be logged out', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.locator('a[href="/login"]').waitFor({ state: 'visible', timeout: 10000 });
});
