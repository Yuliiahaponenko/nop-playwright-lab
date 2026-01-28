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
  const locator = page.locator(selector);
  // If multiple elements match, use first() to avoid strict mode violation
  const count = await locator.count();
  if (count > 1) {
    await locator.first().click();
  } else {
    await locator.click();
  }
});

When('I force click element using css {string}', async function(this: CustomWorld, selector: string) {
  const page = await this.getPage();
  const locator = page.locator(selector);
  const count = await locator.count();
  if (count > 1) {
    await locator.first().click({ force: true });
  } else {
    await locator.click({ force: true });
  }
});

When('I check the checkbox using css {string}', async function(this: CustomWorld, selector: string) {
  const page = await this.getPage();
  const locator = page.locator(selector);
  const count = await locator.count();
  const target = count > 1 ? locator.first() : locator;
  // Use evaluate to click hidden checkbox (nopCommerce hides it with CSS)
  await target.evaluate((el: HTMLElement) => (el as HTMLInputElement).click());
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
  const selectLocator = page.locator(selector);
  
  // Wait for select to be visible and enabled
  await selectLocator.waitFor({ state: 'visible', timeout: 10000 });
  
  // Wait for options to be loaded - wait until there are multiple options (dynamic dropdowns load via AJAX)
  await page.waitForFunction(
    (sel) => {
      const select = document.querySelector(sel) as HTMLSelectElement;
      return select && select.options.length > 1 && !select.disabled;
    },
    selector,
    { timeout: 15000 }
  );
  
  // Small delay to ensure AJAX loading completes
  await page.waitForTimeout(500);
  
  // Try selecting by label text (matches option text content)
  try {
    await selectLocator.selectOption({ label: option });
  } catch (error) {
    // Fallback: try exact text match
    try {
      await selectLocator.selectOption(option);
    } catch (fallbackError) {
      // Last resort: find option by partial text match
      const options = await selectLocator.locator('option').all();
      let found = false;
      for (const opt of options) {
        const text = await opt.textContent();
        if (text && text.trim() === option) {
          const value = await opt.getAttribute('value');
          if (value) {
            await selectLocator.selectOption(value);
            found = true;
            break;
          }
        }
      }
      if (!found) {
        throw new Error(`Could not find option "${option}" in select ${selector}. Available options: ${(await Promise.all(options.map(o => o.textContent()))).join(', ')}`);
      }
    }
  }
});

When('I press keyboard key {string}', async function(this: CustomWorld, key: string) {
  const page = await this.getPage();
  await page.keyboard.press(key);
});

When('I wait for {int} seconds', async function(this: CustomWorld, seconds: number) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
});

Then('I should see element using css {string} to be visible', async function(this: CustomWorld, selector: string) {
  const page = await this.getPage();
  const locator = page.locator(selector);
  // Use first() when multiple elements match to avoid strict mode violation (e.g. .product-title on search results)
  const count = await locator.count();
  const target = count > 1 ? locator.first() : locator;
  await target.waitFor({ state: 'visible', timeout: 10000 });
});

Then('I wait for any element using css {string} to be visible', async function(this: CustomWorld, selector: string) {
  const page = await this.getPage();
  await page.locator(selector).first().waitFor({ state: 'visible', timeout: 10000 });
});

Then('I wait up to {int} seconds for any element using css {string} to be visible', async function(this: CustomWorld, seconds: number, selector: string) {
  const page = await this.getPage();
  await page.locator(selector).first().waitFor({ state: 'visible', timeout: seconds * 1000 });
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
