// tests/Admin_Module/TestSteps_a4f92ef2.spec.ts
// Test Case ID: TC_A84087
// Description:  Confirm Edit Account button triggers account details page

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { DashboardPage } from '../../pages/common/DashboardPage';
import { AccountsListPage } from '../../pages/Admin_Module/AccountsListPage'
import { AccountMembersPage } from '../../pages/Admin_Module/AccountMembersPage'

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Confirm Edit Account button triggers account details page', () => {

  test('Edit Account button opens account details edit form', async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const accountsListPage  = new AccountsListPage(page);
    const accountMembersPage = new AccountMembersPage(page);

    // Login and navigate to Accounts
    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);
    await dashboardPage.navigateToAccounts();

    // Assert Accounts heading, then drill into Feature Flag Environment
    await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible({ timeout: 60000 });
    await accountsListPage.openFeatureFlagAccount();

    //await accountsPage.assertFeatureFlagHeadingVisible();
    await expect(page.getByRole('heading', { name: 'MuukTest - Feature Flag' })).toBeVisible({ timeout: 60000 });


    // Click Edit Account and assert all form elements are visible
    await accountMembersPage.clickEditAccount();
    
    await expect(page.getByRole('link', { name: 'MuukTest - Feature Flag' })).toBeVisible({ timeout: 60000 });
    await expect(page.locator('form').filter({ hasText: 'Account Name Default language' }).locator('img')).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('button', { name: 'Update Account' })).toBeVisible({ timeout: 60000 });
  });

});
