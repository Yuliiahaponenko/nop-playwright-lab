import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  testMatch: ['**/*.spec.ts'],
  timeout: 60000,
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { outputFolder: 'test-reports', open: 'never' }],
    ['json', { outputFile: 'test-reports/index.json' }],
    ['junit', { outputFile: 'test-reports/junit.xml' }]
  ],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-gpu',
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ]
        }
      },
    },
  ],
});