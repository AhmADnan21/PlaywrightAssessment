# Playwright Automation Assessment

## Technology
- Playwright
- TypeScript
- Node.js

## Installation

npm install

## Run Tests

npx playwright test

## Run with Browser

npx playwright test --headed

## Test Cases

### Q1 Banking Manager
- Create customers
- Verify customers in table
- Delete specific customers

### Q2 Customer Transaction
- Login as Hermoine Granger
- Select account 1003
- Perform credit/debit transactions
- Verify calculated balance against UI balance

## CI/CD
GitHub Actions executes tests automatically and generates Playwright reports.