🧪 Playwright + Cucumber + TypeScript + Node.js Framework

This project is a robust end-to-end test automation framework using:

✅ Playwright for browser automation

✅ Cucumber for BDD (Gherkin syntax)

✅ TypeScript for static typing

✅ Node.js as the runtime

✅ Visual Studio Code for development


🚀 Quickstart

1. Prerequisites
Visual Studio Code

Download and install from the official website.

After installing, open VSCode and install the official Playwright Test for VSCode extension:

Go to the Settings → Extensions tab
(or press Ctrl+Shift+X / Cmd+Shift+X)

Search for: Playwright Test for VSCode

Publisher: Microsoft
(Run Playwright tests in Visual Studio Code.)

Install the extension

Also, install the official Cucumber extension:

Go to the Settings → Extensions tab
(or press Ctrl+Shift+X / Cmd+Shift+X)

Search for: Cucumber

Publisher: Cucumber
(Cucumber for Visual Studio Code)

Install the extension

Node.js
🪟 Windows

Go to the official Node.js download page

Download the latest LTS version

Run the installer

Leave default settings checked (includes npm)

Follow the prompts to complete installation

Verify installation:

node -v
npm -v

🍎 macOS

Install Homebrew (if not installed):

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"


Install Node.js:

brew install node


Verify installation:

node -v
npm -v

Git
🪟 Windows

Go to the Git downloads page

Download and run the installer

Choose default options unless you have specific needs

Verify installation:

git --version

🍎 macOS

Check if Git is already installed:

git --version


If not installed or needs update:

brew install git

2. Clone the Repo

Setup your repository.

[Option 1] In VSCode directly

Click the Source Control icon on the left

Select Clone Repository

Paste repository URL

Select a directory where the project will be located

[Option 2] Or in the terminal
cd your-projects-directory
git clone https://github.com/vskryabin/typescript-playwright-bdd.git
cd typescript-playwright-bdd

3. Install Dependencies
🍎 macOS

In VSCode, open Terminal and run:

npm install


Install Playwright browsers:

npx playwright install

🪟 Windows

Open PowerShell as Admin (Run as Administrator)

Check current execution policy:

Get-ExecutionPolicy


If Restricted, change to RemoteSigned:

Set-ExecutionPolicy RemoteSigned


Validate that it changed:

Get-ExecutionPolicy


Then in VSCode, open Terminal and run:

npm install


Install Playwright browsers:

npx playwright install

4.1 Running BDD tests

BDD Playwright tests:

npm run bdd -- "@bdd1"

4.2 Running Playwright tests

Playwright tests:

npx playwright test
npx playwright test tests/test.spec.ts
npx playwright test -g "partial test name"
npx playwright test -g "partial test name" -g "another partial test name"
npx playwright test --grep-invert "excluded partial name"


Playwright report:

npx playwright show-report test-reports

More
Codegen
npx playwright codegen

Playwright Documentation

https://playwright.dev/docs/intro
