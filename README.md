#nop-playwright-lab

🧪 Playwright + TypeScript E2E Testing Framework

This repository is my personal test automation lab using Playwright and TypeScript for end-to-end UI testing of web applications with readable, maintainable test scripts.

🛠 Tech Stack

✅ Playwright – Browser automation and test runner

✅ TypeScript – Static typing and robust code

✅ Node.js – Runtime environment

✅ Visual Studio Code – Recommended editor

🚀 Quickstart
1. Prerequisites
Visual Studio Code

Install VS Code from the official source.

Then install helpful extensions:

Playwright Test for VS Code

Open Extensions (Ctrl+Shift+X / Cmd+Shift+X)

Search for: Playwright Test

Publisher: Microsoft

Install

Cucumber / Gherkin Support (optional if using BDD)

Search for: Cucumber / Gherkin

Install extensions to support feature syntax

Node.js

Make sure Node.js is installed (LTS version recommended):

Check versions:

node -v
npm -v

Git

Verify that Git is installed:

git --version

2. Clone the Repository

In your terminal:

git clone https://github.com/Yuliiahaponenko/nop-playwright-lab.git
cd nop-playwright-lab

3. Install Dependencies

Install project dependencies:

npm install


Install Playwright browsers:

npx playwright install

4. Running Tests
Run All Playwright Tests
npx playwright test

Run a Specific Test File
npx playwright test path/to/test-file.spec.ts

Run Tests with a Filter (e.g., by name or tag)
npx playwright test -g "partial test name"

📊 View Reports

After running tests, you can view the Playwright HTML report:

npx playwright show-report

🧩 Useful Commands

Generate code (Playwright Codegen):

npx playwright codegen


Run with headful mode (see browser interactions):

npx playwright test --headed

🗂 Project Structure (Example)
nop-playwright-lab/
├─ tests/
│   ├─ example.spec.ts                # Example Playwright test file
├─ playwright.config.ts               # Playwright configuration
├─ package.json                      # NPM scripts & dependencies
├─ tsconfig.json                     # TypeScript config


Update this section if your actual repo structure differs.

📚 Resources

Playwright Official Docs – https://playwright.dev/docs/intro

TypeScript Support in Playwright – https://playwright.dev/docs/test-typescript

🚀 Tips for Success

Keep test selectors robust and meaningful (use getByRole, getByLabel, etc.).

Organize page actions into reusable helpers or Page Objects.

Use Playwright’s built-in report and trace features to debug flakiness.
