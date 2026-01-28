import { Given, When, Then } from '@cucumber/cucumber';
import { getPage } from './browser-context';

/**
 * Action Steps
 * These steps handle user interactions like clicking, filling, selecting
 */

// Click element - Register with When (works with When, And after When, But after When)
const clickElement = async (selector: string) => {
  const page = await getPage();
  await page.locator(selector).click();
};

When('I click element using css {string}', clickElement);

// Fill element - Register with When (works with When, And after When, But after When)
const fillElement = async (selector: string, value: string) => {
  const page = await getPage();
  if (value === '') {
    await page.locator(selector).clear();
  } else {
    await page.locator(selector).fill(value);
  }
};

When('I fill element using css {string} with value {string}', fillElement);

// Select option - Register with When (works with When, And after When, But after When)
const selectOption = async (option: string, selector: string) => {
  const page = await getPage();
  await page.locator(selector).selectOption(option);
};

When('I select option {string} from element using css {string}', selectOption);

// Press keyboard key
const pressKey = async (key: string) => {
  const page = await getPage();
  await page.keyboard.press(key);
};

When('I press keyboard key {string}', pressKey);
