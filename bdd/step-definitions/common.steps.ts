import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

Given('I go to url {string}', async (url: string) => {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
  }
  await page.goto(url);
});

When('I click element using css {string}', async (selector: string) => {
  await page.locator(selector).click();
});

When('I fill element using css {string} with value {string}', async (selector: string, value: string) => {
  await page.locator(selector).fill(value);
});

When('I press keyboard key {string}', async (key: string) => {
  await page.keyboard.press(key);
});

Then('I should see the page title contains {string}', async (text: string) => {
  const title = await page.title();
  if (!title.includes(text)) {
    throw new Error(`Expected page title to contain "${text}", but got "${title}"`);
  }
});

Then('I should see element using css {string} to be visible', async (selector: string) => {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout: 10000 });
});

Then('I should see element using css {string} inner text contains {string}', async (selector: string, text: string) => {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout: 10000 });
  const elementText = await element.textContent();
  if (!elementText || !elementText.includes(text)) {
    throw new Error(`Expected element text to contain "${text}", but got "${elementText}"`);
  }
});

Then('I wait for any element using css {string} to be visible', async (selector: string) => {
  await page.locator(selector).first().waitFor({ state: 'visible', timeout: 10000 });
});

Then('I should see the page url contains {string}', async (text: string) => {
  const url = page.url();
  if (!url.includes(text)) {
    throw new Error(`Expected URL to contain "${text}", but got "${url}"`);
  }
});

When('I select option {string} from element using css {string}', async (option: string, selector: string) => {
  await page.locator(selector).selectOption(option);
});

Then('I should see element using css {string} count is less than {string}', async (selector: string, count: string) => {
  const elements = page.locator(selector);
  const actualCount = await elements.count();
  const expectedCount = parseInt(count, 10);
  if (actualCount >= expectedCount) {
    throw new Error(`Expected element count to be less than ${expectedCount}, but got ${actualCount}`);
  }
});

Then('I should see element using css {string} has value {string}', async (selector: string, value: string) => {
  const element = page.locator(selector);
  const actualValue = await element.inputValue();
  if (actualValue !== value) {
    throw new Error(`Expected element value to be "${value}", but got "${actualValue}"`);
  }
});

When('I reload the page', async () => {
  await page.reload();
});
