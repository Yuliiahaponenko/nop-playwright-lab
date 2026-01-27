# nopCommerce Web Application Automation Framework

🧪 **Playwright + TypeScript Framework** for comprehensive end-to-end testing of the nopCommerce e-commerce platform.

## 📋 Overview

This framework provides automated testing for the nopCommerce web application using Playwright and TypeScript. It follows industry best practices with Page Object Model (POM), custom fixtures, and supports parallel execution across multiple browsers.

**Application URL:** https://nop-qa.portnov.com

## ✨ Features

- ✅ **Page Object Model (POM)** - Maintainable and reusable page objects
- ✅ **TypeScript** - Type-safe test automation
- ✅ **Custom Fixtures** - Pre-configured page objects and components
- ✅ **Cross-Browser Testing** - Chrome, Firefox, Safari support
- ✅ **Parallel Execution** - Fast test execution
- ✅ **Comprehensive Reporting** - HTML, JSON, JUnit reports
- ✅ **CI/CD Integration** - GitHub Actions workflow
- ✅ **API Testing Support** - API client for backend validation
- ✅ **Test Data Management** - Dynamic and static test data generators

## 🏗️ Framework Structure

```
playwright-nopcommerce-framework/
├── src/
│   ├── pages/                    # Page Object Model
│   │   ├── base/BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   ├── ProductListPage.ts
│   │   ├── ProductDetailPage.ts
│   │   ├── ShoppingCartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── OrderConfirmationPage.ts
│   │   ├── MyAccountPage.ts
│   │   └── components/           # Reusable components
│   │
│   ├── tests/                    # Test Specifications
│   │   ├── auth/                 # Authentication tests
│   │   ├── products/             # Product tests
│   │   ├── cart/                 # Shopping cart tests
│   │   ├── checkout/             # Checkout tests
│   │   └── e2e/                  # End-to-end tests
│   │
│   ├── fixtures/                 # Test fixtures
│   ├── utils/                    # Utility classes
│   ├── api/                      # API client
│   └── data/                     # Test data files
│
├── playwright.config.ts          # Playwright configuration
├── package.json
├── tsconfig.json
└── .env                          # Environment variables
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nop-playwright-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests for specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run specific test suite
```bash
npm run test:auth          # Authentication tests
npm run test:products      # Product tests
npm run test:cart          # Cart tests
npm run test:checkout      # Checkout tests
npm run test:e2e           # E2E tests
```

### Run specific test file
```bash
npx playwright test src/tests/auth/registration.spec.ts
```

### Run tests matching a pattern
```bash
npx playwright test -g "registration"
```

## 📊 Test Reports

### View HTML report
```bash
npm run report
```

Reports are generated in the `playwright-report/` directory after test execution.

## 📝 Test Cases Coverage

### Critical Priority Tests (MUST AUTOMATE)

#### Authentication (4 tests)
- ✅ TC-AUTH-001: User Registration - New Account Creation
- ✅ TC-AUTH-002: User Login - Valid Credentials
- ✅ TC-AUTH-003: User Login - Invalid Credentials
- ✅ TC-AUTH-004: User Logout

#### Products (3 tests)
- ✅ TC-PROD-001: Product Search - Keyword Search
- ✅ TC-PROD-002: Product Filters - Price Range Filter
- ✅ TC-PROD-003: Product Detail Page - View Product Details

#### Shopping Cart (4 tests)
- ✅ TC-CART-001: Add Product to Cart from Product List
- ✅ TC-CART-002: Add Product to Cart from Product Detail Page
- ✅ TC-CART-003: Update Cart - Change Quantity
- ✅ TC-CART-004: Remove Product from Cart

#### Checkout (3 tests)
- ✅ TC-CHECKOUT-001: Guest Checkout - Complete Purchase
- ✅ TC-CHECKOUT-002: Registered User Checkout
- ✅ TC-CHECKOUT-003: Checkout Validation - Required Fields

#### End-to-End (2 tests)
- ✅ TC-E2E-001: Complete User Journey - New User to Order Completion
- ✅ TC-E2E-002: Guest User Purchase Flow

**Total: 16 critical test cases implemented**

## 🛠️ Development

### Code Quality

**Linting**
```bash
npm run lint
```

**Formatting**
```bash
npm run format
```

### Adding New Tests

1. Create test file in appropriate directory under `src/tests/`
2. Import fixtures and page objects
3. Use Page Object Model pattern
4. Follow existing test structure

**Example:**
```typescript
import { test, expect } from '../../fixtures/test.fixture';
import { TestData } from '../../utils/TestData';

test.describe('My New Test Suite', () => {
  test('My test case', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.clickLogin();
    // ... test steps
  });
});
```

## 🔧 Configuration

### Playwright Configuration

Edit `playwright.config.ts` to customize:
- Browser projects
- Test timeout
- Screenshot/video settings
- Reporter configuration
- Parallel execution settings

### Environment Variables

Edit `.env` file:
```env
BASE_URL=https://nop-qa.portnov.com
API_BASE_URL=https://nop-qa.portnov.com/api
```

## 📦 Dependencies

### Core Dependencies
- `@playwright/test` - Playwright test framework
- `typescript` - TypeScript compiler
- `dotenv` - Environment variable management

### Dev Dependencies
- `@types/node` - Node.js type definitions
- `eslint` - Code linting
- `prettier` - Code formatting

## 🔄 CI/CD Integration

The framework includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:
- Runs tests on push/PR to main/develop branches
- Executes tests on multiple browsers (Chromium, Firefox, WebKit)
- Generates and uploads test reports
- Runs scheduled tests daily

## 📚 Documentation

### Key Locators Reference

**Common Locators:**
- Register Link: `a[href="/register"]`
- Login Link: `a[href="/login"]`
- Cart Link: `a[href="/cart"]`
- Search Box: `#small-searchterms`

**Product Page:**
- Product Title: `.product-name h1`
- Price: `.product-price span`
- Add to Cart: `#add-to-cart-button`

**Checkout:**
- Billing First Name: `#BillingNewAddress_FirstName`
- Payment Method: `input[value='Payments.Manual']`
- Confirm Button: `.confirm-order-next-step-button`

## 🎯 Best Practices

1. **Use Page Object Model** - All page interactions through page objects
2. **Generate Unique Test Data** - Use `TestData` utility for dynamic data
3. **Wait for Elements** - Use Playwright's auto-wait, avoid hard waits
4. **Keep Tests Independent** - Each test should be able to run standalone
5. **Use Descriptive Test Names** - Follow TC-ID naming convention
6. **Handle Async Operations** - Properly await all async operations

## 🐛 Troubleshooting

### Tests failing with timeout
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify application is accessible

### Browser not launching
- Run `npx playwright install --with-deps`
- Check system dependencies

### TypeScript errors
- Run `npm install` to ensure dependencies are installed
- Check `tsconfig.json` configuration

## 📄 License

ISC

## 👥 Contributors

- Framework created based on test plan v1.0
- Last Updated: 2026-01-26

---

**Status:** ✅ Ready for Implementation  
**Framework Version:** 1.0.0  
**Test Plan Version:** 1.0
