nop-playwright-lab
🧪 Playwright + Cucumber + TypeScript + Node.js Framework
A modern end-to-end test automation framework built to practice and demonstrate Playwright, BDD with Cucumber, and TypeScript using real-world scenarios.
 
✨ Tech Stack
This project uses:
•	✅ Playwright — fast, reliable browser automation
•	✅ Cucumber — BDD with Gherkin syntax
•	✅ TypeScript — type safety and maintainability
•	✅ Node.js — runtime environment
•	✅ Visual Studio Code — recommended IDE
 
🚀 Quickstart
1. Prerequisites
 
Visual Studio Code
Download and install Visual Studio Code from the official website.
After installation, install the following extensions:
Playwright Test for VS Code
•	Open Extensions (Ctrl+Shift+X / Cmd+Shift+X)
•	Search: Playwright Test
•	Publisher: Microsoft
•	Install
Cucumber for VS Code
•	Open Extensions
•	Search: Cucumber
•	Publisher: Cucumber
•	Install
These extensions provide syntax highlighting, step navigation, and test execution support.
 
Node.js
🪟 Windows
1.	Go to the official Node.js download page
2.	Download the latest LTS version
3.	Run the installer (leave default options checked)
4.	Complete installation
Verify installation:
node -v
npm -v
 
🍎 macOS
Install Homebrew (if not already installed):
/ bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Install Node.js:
brew install node
Verify installation:
node -v
npm -v
 
Git
🪟 Windows
•	Download Git from the official website
•	Install using default options
Verify:
git --version
🍎 macOS
Check if Git is installed:
git --version
If needed:
brew install git
 
2. Clone the Repository
Option 1: Clone via VS Code
•	Open Source Control
•	Click Clone Repository
•	Paste:
https://github.com/Yuliiahaponenko/nop-playwright-lab.git
•	Choose a local directory
 
Option 2: Clone via Terminal
cd your-projects-directory
git clone https://github.com/Yuliiahaponenko/nop-playwright-lab.git
cd nop-playwright-lab
 
3. Install Dependencies
🍎 macOS
npm install
npx playwright install
 
🪟 Windows
Open PowerShell as Administrator
Check execution policy:
Get-ExecutionPolicy
If Restricted, update it:
Set-ExecutionPolicy RemoteSigned
Verify:
Get-ExecutionPolicy
Install dependencies:
npm install
npx playwright install
 
4. Running Tests
4.1 Running BDD (Cucumber) Tests
npm run bdd -- "@bdd1"
 
4.2 Running Playwright Tests
Run all tests:
npx playwright test
Run a specific test file:
npx playwright test tests/example.spec.ts
Run tests by name:
npx playwright test -g "partial test name"
Exclude tests:
npx playwright test --grep-invert "excluded test name"
 
📊 Reports
View Playwright HTML report:
npx playwright show-report
 
🧰 Tools
Codegen
Generate tests interactively:
npx playwright codegen
 
📚 Documentation
•	Playwright Docs: https://playwright.dev/docs/intro
 
🧠 About This Project
This repository is a personal Playwright lab used to:
•	Practice BDD and Playwright patterns
•	Build readable, maintainable automation
•	Showcase testing skills for professional growth
 
 

