# nopCommerce Web Application Automation Framework

🧪 **Playwright + Cucumber + TypeScript + Node.js Framework**

End-to-end test automation framework for the **nopCommerce** e-commerce platform: BDD (Cucumber/Gherkin) with Playwright and TypeScript, Page Object Model, structured test data, and CI/CD via GitHub Actions.

**Scope:** 14 feature files, 37+ scenarios across auth, cart, checkout, products, and E2E flows.

This project uses:

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

**Run a single feature file (only that file runs):**
```bash
npm run bdd:file -- src/bdd/features/auth/logout.feature
npm run bdd:file -- src/bdd/features/auth/login.feature
```
Or in VS Code: open the `.feature` file → **Terminal → Run Task…** → **Run current BDD feature file**.

### 4.2 Playwright (optional)

If you add Playwright spec files under `src/tests/`, you can run:
```bash
npm test
npx playwright test --headed
npx playwright show-report
```

---

## 🏗️ Framework Structure

```
nop-playwright-lab/
├── src/
│   ├── bdd/                      # BDD Cucumber Tests
│   │   ├── features/             # Gherkin feature files
│   │   │   ├── auth/              # login, logout, registration
│   │   │   ├── cart/              # add, remove, update
│   │   │   ├── checkout/          # guest, registered, payment methods
│   │   │   ├── products/          # search, filters, details
│   │   │   └── e2e/               # complete user journey, guest purchase
│   │   ├── steps/                 # Step definitions
│   │   │   ├── auth.steps.ts
│   │   │   ├── cart.steps.ts
│   │   │   ├── checkout.steps.ts
│   │   │   └── common.steps.ts
│   │   └── support/               # Cucumber support
│   │       ├── world.ts           # Custom World (Playwright context)
│   │       ├── hooks.ts           # Before/After hooks
│   │       └── env.ts             # Environment setup
│   │
│   ├── pages/                     # Page Object Model
│   │   ├── base/BasePage.ts
│   │   ├── components/            # Header, Footer, MiniCart, Search
│   │   ├── HomePage, LoginPage, RegisterPage
│   │   ├── ProductListPage, ProductDetailPage
│   │   ├── ShoppingCartPage, CheckoutPage
│   │   ├── OrderConfirmationPage, MyAccountPage
│   │   └── ...
│   │
│   ├── utils/                     # Helper, Logger, TestData
│   └── data/                      # products.json, testData.json, users.json
│
├── cucumber.cjs                  # Cucumber configuration
├── playwright.config.ts          # Playwright configuration
├── package.json
├── tsconfig.json
├── .env                          # Environment variables
└── .vscode/                      # Settings, tasks (e.g. run current feature)
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

### Adding more BDD scenarios

Add new `.feature` files under `src/bdd/features/` and implement or reuse steps in `src/bdd/steps/`. Use page objects from `src/pages/` where step definitions need UI interactions.

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
- ✅ Run BDD tests on push/PR to main and develop
- ✅ Chromium browser, env vars for base URL
- ✅ Upload Cucumber report artifact
- ✅ Scheduled daily runs (2 AM UTC)

