// tests/Admin_Module/TestSteps_a4f951b9.spec.ts
// Test Case ID: TC_A84089
// Description:  Confirm Invite A User button triggers the user invite page

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { DashboardPage } from '../../pages/common/DashboardPage';
import { AccountsListPage } from '../../pages/Admin_Module/AccountsListPage'
import { AccountMembersPage } from '../../pages/Admin_Module/AccountMembersPage'
import { InviteUserPage } from '../../pages/Admin_Module/InviteUserPage'

const BASE_URL     = process.env.BASE_URL ?? '';
const EMAIL        = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD     = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Confirm Invite A User button triggers the user invite page', () => {

  test('invite user page opens with correct form elements', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const dashboardPage  = new DashboardPage(page);
    const accountsListPage   = new AccountsListPage(page);
    const accountMembersPage = new AccountMembersPage(page);
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
    await accountMembersPage.clickInviteUser();

    // Assert all invite form elements are visible
    await expect(page.getByText('Name')).toBeVisible({ timeout: 60000 });
    await expect(page.getByText('Email')).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible({ timeout: 60000 });
    await expect(page.getByText('Admin')).toBeVisible({ timeout: 60000 });
    await expect(page.getByText('Flow editor')).toBeVisible({ timeout: 60000 });
    await expect(page.getByRole('button', { name: 'Send invitation' })).toBeVisible({ timeout: 60000 });
  });

});
