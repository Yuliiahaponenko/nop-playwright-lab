import { Before, After, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';

setDefaultTimeout(120000);

Before({ timeout: 120000 }, async function(this: CustomWorld) {
  await this.init();
});

After(async function(this: CustomWorld, { result }) {
  if (result && result.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, 'image/png');
  }
  await this.cleanup();
});

AfterAll(async function() {
  console.log('✅ Tests completed');
});
