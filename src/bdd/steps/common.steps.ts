import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('I go to url {string}', async function(this: CustomWorld, url: string) {
  const page = await this.getPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
});

When('I reload the page', async function(this: CustomWorld) {
  const page = await this.getPage();
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
});

When('I click element using css {string}', async function(this: CustomWorld, selector: string) {
  const page = await this.getPage();
  await page.locator(selector).click();
});

When('I fill element using css {string} with value {string}', async function(this: CustomWorld, selector: string, value: string) {
  const page = await this.getPage();
  if (value === '') {
    await page.locator(selector).clear();
  } else {
    await page.locator(selector).fill(value);
  }
});

When('I select option {string} from element using css {string}', async function(this: CustomWorld, option: string, selector: string) {
  const page = await this.getPage();
  await page.locator(selector).selectOption(option);
});

When('I press keyboard key {string}', async function(this: CustomWorld, key: string) {
  const page = await this.getPage();
  await page.keyboard.press(key);
});

Then('I should see element using css {string} to be visible', async function(this: CustomWorld, selector: string) {
  const page = await this.getPage();
  await page.locator(selector).waitFor({ state: 'visible', timeout: 10000 });
});

Then('I wait for any element using css {string} to be visible', async function(this: CustomWorld, selector: string) {
  const page = await this.getPage();
  await page.locator(selector).first().waitFor({ state: 'visible', timeout: 10000 });
});

Then('I should see element using css {string} inner text contains {string}', async function(this: CustomWorld, selector: string, text: string) {
  const page = await this.getPage();
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout: 10000 });
  const elementText = await element.textContent();
  if (!elementText || !elementText.includes(text)) {
    throw new Error(`Expected element text to contain "${text}", but got "${elementText}"`);
  }
});

Then('I should see the page title contains {string}', async function(this: CustomWorld, text: string) {
  const page = await this.getPage();
  const title = await page.title();
  if (!title.includes(text)) {
    throw new Error(`Expected page title to contain "${text}", but got "${title}"`);
  }
});

Then('I should see the page url contains {string}', async function(this: CustomWorld, text: string) {
  const page = await this.getPage();
  const url = page.url();
  if (!url.includes(text)) {
    throw new Error(`Expected URL to contain "${text}", but got "${url}"`);
  }
});

Then('I should see element using css {string} count is less than {string}', async function(this: CustomWorld, selector: string, count: string) {
  const page = await this.getPage();
  const elements = page.locator(selector);
  const actualCount = await elements.count();
  const expectedCount = parseInt(count, 10);
  if (actualCount >= expectedCount) {
    throw new Error(`Expected element count to be less than ${expectedCount}, but got ${actualCount}`);
  }
});

Then('I should see element using css {string} has value {string}', async function(this: CustomWorld, selector: string, value: string) {
  const page = await this.getPage();
  const element = page.locator(selector);
  const actualValue = await element.inputValue();
  if (actualValue !== value) {
    throw new Error(`Expected element value to be "${value}", but got "${actualValue}"`);
  }
});
