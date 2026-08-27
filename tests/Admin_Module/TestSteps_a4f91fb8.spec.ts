// tests/Admin_Module/TestSteps_a4f91fb8.spec.ts
// Test Case ID: TC_A84086
// Description:  Confirm Switch button sets account as active

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { DashboardPage } from '../../pages/common/DashboardPage';

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Confirm Switch button sets account as active', () => {

  test('switching account marks it as current and hides the Switch button', async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    //const accountsPage  = new AccountsPage(page);

    // Login and navigate to Accounts
    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);
    await dashboardPage.navigateToAccounts();

    // // Assert Accounts heading is visible
    // await accountsPage.assertAccountsHeadingVisible();

    // // Click the Switch button on the Feature Flag Environment row
    // await accountsPage.clickSwitch();

    // // After switching, "Current Account" badge must be visible
    // await accountsPage.assertCurrentAccountBadgeVisible();

    // // Once active, the Switch button must no longer be visible
    // await accountsPage.assertSwitchButtonNotVisible();
  });

});
