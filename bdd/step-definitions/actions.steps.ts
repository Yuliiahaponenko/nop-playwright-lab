import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../../src/bdd/support/world';

/**
 * Action Steps
 * These steps handle user interactions like clicking, filling, selecting
 */

When('I click element using css {string}', async function (this: CustomWorld, selector: string) {
  const page = await this.getPage();
  await page.locator(selector).click();
});

When('I fill element using css {string} with value {string}', async function (this: CustomWorld, selector: string, value: string) {
  const page = await this.getPage();
  if (value === '') {
    await page.locator(selector).clear();
  } else {
    await page.locator(selector).fill(value);
  }
});

When('I select option {string} from element using css {string}', async function (this: CustomWorld, option: string, selector: string) {
  const page = await this.getPage();
  await page.locator(selector).selectOption(option);
});

When('I press keyboard key {string}', async function (this: CustomWorld, key: string) {
  const page = await this.getPage();
  await page.keyboard.press(key);
});
