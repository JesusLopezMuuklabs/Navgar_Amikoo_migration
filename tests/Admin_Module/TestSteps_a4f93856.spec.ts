// tests/Admin_Module/TestSteps_a4f93856.spec.ts
// Test Case ID: TC_A84088
// Description:  Confirm added users appear in permissions list

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { DashboardPage } from '../../pages/common/DashboardPage';
import { AccountsListPage } from '../../pages/Admin_Module/AccountsListPage'
//import { AccountMembersPage } from '../../pages/Admin_Module/AccountMembersPage'
//import { InviteUserPage } from '../../pages/Admin_Module/InviteUserPage'

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Confirm added users appear in permissions list', () => {

  test('permissions table columns are visible after navigating to account', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const dashboardPage  = new DashboardPage(page);
    const accountsListPage   = new AccountsListPage(page);
    //const accountMembersPage = new AccountMembersPage(page);
    //const inviteUserPage = new InviteUserPage(page);

    // Login and navigate to Accounts
    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);
    await dashboardPage.navigateToAccounts();

    // Assert Accounts heading, drill in, click Invite A User
    await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible({ timeout: 60000 });
    await accountsListPage.openFeatureFlagAccount();

    //await accountsPage.assertFeatureFlagHeadingVisible();
    await expect(page.getByRole('heading', { name: 'MuukTest - Feature Flag' })).toBeVisible({ timeout: 60000 });

    // Assert all permissions table column headers are visible
    await expect(page.getByRole('columnheader', { name: 'User' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('columnheader', { name: 'Friendly code' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('columnheader', { name: 'Phone number' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('columnheader', { name: 'Roles' })).toBeVisible({ timeout: 60000 });
  });

});
