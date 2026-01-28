import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: false,
        timeout: 60000,
        slowMo: 100
      });
    }
    
    if (!this.context) {
      this.context = await this.browser.newContext({
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true
      });
    }
    
    if (!this.page) {
      this.page = await this.context.newPage();
    }
  }

  async getPage(): Promise<Page> {
    if (!this.page) {
      await this.init();
    }
    return this.page!;
  }

  async cleanup(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = undefined;
    }
    if (this.context) {
      await this.context.close();
      this.context = undefined;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = undefined;
    }
  }
}

setWorldConstructor(CustomWorld);
