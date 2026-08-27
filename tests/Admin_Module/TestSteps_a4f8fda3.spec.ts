// tests/Admin_Module/TestSteps_a4f8fda3.spec.ts
// Test Case ID: TC_A84084
// Description:  Confirm account name is listed in header

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { DashboardPage } from '../../pages/common/DashboardPage';
//import { AccountsPage } from '../../pages/AccountsPage';

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';


test.describe('Confirm account name is listed in header', () => {

  test('account name cells are visible in the Accounts page table', async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    //const accountsPage  = new AccountsPage(page);

    // Login and navigate to Accounts
    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);
    await dashboardPage.navigateToAccounts();

    // Assert the Accounts heading and both MuukTest account name cells are visible
    await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('link', { name: 'MuukTest - Feature Flag' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('link', { name: 'MuukTest - Production' })).toBeVisible({ timeout: 60000 });
  });

});
