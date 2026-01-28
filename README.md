# nopCommerce Web Application Automation Framework

🧪 **Playwright + Cucumber + TypeScript + Node.js Framework**

This project is a robust end-to-end test automation framework for the **nopCommerce** e-commerce platform using:

✅ **Playwright** for browser automation  
✅ **Cucumber** for BDD (Gherkin syntax)  
✅ **TypeScript** for static typing  
✅ **Node.js** as the runtime  
✅ **Visual Studio Code** for development  
✅ **Page Object Model (POM)** for maintainability

**Application URL:** https://nop-qa.portnov.com

---

## 🚀 Quickstart

### 1. Prerequisites

#### Visual Studio Code
Download and install from the [official website](https://code.visualstudio.com/).

After installing, open VSCode and install the required extensions:

**Playwright Test for VSCode**
- Go to the Extensions tab (or press `Ctrl+Shift+X` / `Cmd+Shift+X`)
- Search for: **Playwright Test for VSCode**
- Publisher: **Microsoft** (microsoft.com)
- Click **Install**

**Cucumber**
- Go to the Extensions tab (or press `Ctrl+Shift+X` / `Cmd+Shift+X`)
- Search for: **Cucumber**
- Publisher: **Cucumber** (cucumber.io)
- Click **Install**

#### Node.js

**🪟 Windows**
1. Go to the [official Node.js download page](https://nodejs.org/)
2. Download the latest **LTS version**
3. Run the installer
4. Leave default settings checked (includes npm)
5. Follow the prompts to complete installation
6. Verify installation:
   ```bash
   node -v
   npm -v
   ```

**🍎 macOS**
1. Install Homebrew (if not installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install Node.js:
   ```bash
   brew install node
   ```
3. Verify installation:
   ```bash
   node -v
   npm -v
   ```

#### Git

**🪟 Windows**
1. Go to the [Git downloads page](https://git-scm.com/downloads)
2. Download and run the installer
3. Choose default options unless you have specific needs
4. After installation, open a new terminal (Command Prompt or Git Bash) and verify:
   ```bash
   git --version
   ```

**🍎 macOS**
1. Check if Git is already installed:
   ```bash
   git --version
   ```
2. If not installed or needs update:
   ```bash
   brew install git
   ```

---

### 2. Clone the Repository

**[Option 1] In VSCode directly:**
1. Click **Source Control** icon on the left
2. Select **Clone Repository**
3. Enter: `<your-repository-url>`
4. Select a directory where the project will be located

**[Option 2] Or, alternatively, in terminal:**
```bash
cd your-projects-directory
git clone <your-repository-url>
cd nop-playwright-lab
```

---

### 3. Install Dependencies

**🍎 macOS**

In VSCode, open Terminal and run:
```bash
npm install
```

Install Playwright browsers:
```bash
npx playwright install
```

**🪟 Windows**

1. Open **PowerShell as Admin** (Run as Administrator)
2. Check current execution policy:
   ```powershell
   Get-ExecutionPolicy
   ```
3. If `Restricted`, change to `RemoteSigned`:
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```
4. Validate that it changed:
   ```powershell
   Get-ExecutionPolicy
   ```
5. Then in VSCode, open Terminal and run:
   ```bash
   npm install
   ```
6. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## 🧪 Running Tests

### 4.1 Running BDD Tests

**Run BDD tests with specific tag:**
```bash
npm run bdd:tag "@bdd1"
npm run bdd:tag "@bdd2"
npm run bdd:tag "@bdd3"
```

**Run all BDD tests:**
```bash
npm run bdd
```

**Run specific feature file:**
```bash
npm run bdd -- src/bdd/features/auth/login.feature
npm run bdd -- src/bdd/features/auth/registration.feature
```

### 4.2 Running Playwright Tests

**Run all Playwright tests:**
```bash
npx playwright test
```

**Run specific test file:**
```bash
npx playwright test src/tests/auth/login.spec.ts
npx playwright test src/tests/cart/addToCart.spec.ts
```

**Run tests by name pattern:**
```bash
npx playwright test -g "login"
npx playwright test -g "registration"
```

**Run with multiple patterns:**
```bash
npx playwright test -g "login" -g "valid"
```

**Exclude tests:**
```bash
npx playwright test --grep-invert "excluded partial name"
```

**Run in headed mode (visible browser):**
```bash
npx playwright test --headed
```

**Run in debug mode:**
```bash
npx playwright test --debug
```

### 4.3 Playwright Report

**View HTML report:**
```bash
npx playwright show-report
```

---

## 🏗️ Framework Structure

```
nop-playwright-lab/
├── src/
│   ├── bdd/                      # BDD Cucumber Tests
│   │   ├── features/             # Gherkin feature files
│   │   │   ├── auth/
│   │   │   │   ├── login.feature
│   │   │   │   ├── logout.feature
│   │   │   │   └── registration.feature
│   │   │   ├── cart/
│   │   │   │   └── add_to_cart.feature
│   │   │   ├── checkout/
│   │   │   │   ├── guest_checkout.feature
│   │   │   │   └── registered_checkout.feature
│   │   │   └── e2e/
│   │   │       └── complete_user_journey.feature
│   │   ├── steps/                # Step definitions
│   │   │   ├── auth.steps.ts
│   │   │   ├── cart.steps.ts
│   │   │   ├── checkout.steps.ts
│   │   │   └── common.steps.ts
│   │   └── support/              # Cucumber support files
│   │       ├── world.ts          # Custom World (Playwright context)
│   │       ├── hooks.ts          # Before/After hooks
│   │       └── env.ts            # Environment setup
│   │
│   ├── pages/                    # Page Object Model
│   │   ├── base/
│   │   │   └── BasePage.ts
│   │   ├── components/           # Reusable components
│   │   │   ├── HeaderComponent.ts
│   │   │   ├── FooterComponent.ts
│   │   │   ├── MiniCartComponent.ts
│   │   │   └── SearchComponent.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── RegisterPage.ts
│   │   ├── ProductListPage.ts
│   │   ├── ProductDetailPage.ts
│   │   ├── ShoppingCartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── OrderConfirmationPage.ts
│   │   └── MyAccountPage.ts
│   │
│   ├── tests/                    # Playwright Test Specs
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── products/
│   │   └── e2e/
│   │
│   ├── fixtures/                 # Test fixtures
│   │   └── test.fixture.ts
│   ├── utils/                    # Utility classes
│   │   ├── Helper.ts
│   │   ├── Logger.ts
│   │   └── TestData.ts
│   └── data/                     # Test data files
│       ├── products.json
│       ├── testData.json
│       └── users.json
│
├── cucumber.cjs                  # Cucumber configuration
├── playwright.config.ts          # Playwright configuration
├── package.json
├── tsconfig.json
├── .env                          # Environment variables
└── .vscode/
    └── settings.json             # VSCode Cucumber paths
```


## 🛠️ Development Guide

### Adding BDD Tests

1. Create a `.feature` file in `src/bdd/features/`
2. Write scenarios using Gherkin syntax
3. Add step definitions in `src/bdd/steps/`
4. Use Page Objects for interactions

**Example Feature:**
```gherkin
@bdd1
Feature: User Login
  Scenario: Successful login with valid credentials
    Given I go to url "https://nop-qa.portnov.com"
    When I click on "a[href='/login']"
    And I type "test@example.com" into "#Email"
    And I type "password123" into "#Password"
    And I click on ".login-button"
    Then I should see element ".account"
```

### Adding Playwright Tests

1. Create test file in `src/tests/`
2. Import fixtures and page objects
3. Follow Page Object Model pattern

**Example:**
```typescript
import { test, expect } from '../../fixtures/test.fixture';

test.describe('Login Tests', () => {
  test('TC-AUTH-002: Valid login', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.login('test@example.com', 'password123');
    await expect(loginPage.accountLink).toBeVisible();
  });
});
```

### Code Quality

**Linting:**
```bash
npm run lint
```

**Formatting:**
```bash
npm run format
```

---

## 📚 More

### Codegen (Generate Tests)

```bash
npx playwright codegen https://nop-qa.portnov.com
```

### Playwright Documentation

- [Playwright Official Docs](https://playwright.dev/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Key Locators Reference

**Common Elements:**
- Register: `a[href="/register"]`
- Login: `a[href="/login"]`
- Cart: `a[href="/cart"]`
- Search: `#small-searchterms`
- Account: `.account`

**Product Page:**
- Add to Cart: `#add-to-cart-button-{id}`
- Price: `.product-price span`
- Title: `.product-name h1`

**Checkout:**
- First Name: `#BillingNewAddress_FirstName`
- Payment Method: `input[value='Payments.Manual']`
- Confirm Order: `.confirm-order-next-step-button`

---

## 🎯 Best Practices

1. ✅ **Use Page Object Model** - Keep selectors and actions in page classes
2. ✅ **Write Descriptive Scenarios** - Clear Given-When-Then structure
3. ✅ **Keep Tests Independent** - Each test should run standalone
4. ✅ **Use Playwright Auto-Wait** - Avoid explicit waits
5. ✅ **Generate Unique Data** - Use `TestData` utility for test data
6. ✅ **Tag Your Features** - Use `@bdd1`, `@bdd2`, etc. for selective runs

---

## 🐛 Troubleshooting

### BDD Tests Not Recognized
- Verify `.vscode/settings.json` has correct paths
- Restart VSCode after installing Cucumber extension
- Check `cucumber.cjs` configuration

### Browser Not Launching
```bash
npx playwright install --with-deps
```

### Tests Timing Out
- Increase timeout in `src/bdd/support/hooks.ts`
- Check `browser.launch()` timeout in `src/bdd/support/world.ts`
- Verify network connectivity to test URL

### TypeScript Errors
```bash
npm install
npx tsc --noEmit
```

### Module Resolution Issues
- Ensure `tsx` is installed: `npm install tsx`
- Check `tsconfig.json` configuration
- Verify `cucumber.cjs` uses correct module loader

---

## 📦 Dependencies

**Core:**
- `@playwright/test` - Browser automation
- `@cucumber/cucumber` - BDD test runner
- `typescript` - Static typing
- `tsx` - TypeScript execution
- `dotenv` - Environment variables

**Dev:**
- `@types/node` - Node.js types
- `eslint` - Code linting
- `prettier` - Code formatting

---

## 🔄 CI/CD

GitHub Actions workflow (`.github/workflows/playwright.yml`) includes:
- ✅ Automated test execution on push/PR
- ✅ Multi-browser testing
- ✅ Test report generation
- ✅ Scheduled daily runs

