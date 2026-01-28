export const config = {
  baseUrl: process.env.BASE_URL || 'https://nop-qa.portnov.com',
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '60000'),
  
  browser: {
    headless: process.env.HEADLESS === 'true',
    slowMo: parseInt(process.env.SLOW_MO || '50')
  },
  
  testUser: {
    email: process.env.TEST_USER_EMAIL || 'testuser@example.com',
    password: process.env.TEST_USER_PASSWORD || 'Test123!'
  }
};

export default config;
