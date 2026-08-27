// tests/Admin_Module/account-members-edit.spec.ts
//
// TC84103 — Confirm Delete button removes the user from the workspace
// Muuk file: a4fd21c4
//
// Flow: Login → Profile Menu → Accounts → assert heading →
//        click View (first account row) → assert all 5 column headers →
//        click Edit (first member row)
//
// Note: The Muuk recording ends at the click of "Edit" with no further assertions
// on the Edit Member page (e.g. the Delete button). The test preserves the recorded
// steps exactly as captured. A follow-up story should add assertions/actions on the
// Edit Member page to fully validate the Delete behaviour.

import { test, expect } from '@playwright/test';
import { LoginPage }         from '../../pages/common/LoginPage';
import { DashboardPage }     from '../../pages/common/DashboardPage';
import { AccountsListPage }  from '../../pages/Admin_Module/AccountsListPage';
import { AccountMembersPage } from '../../pages/Admin_Module/AccountMembersPage';

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Account Members — Edit member', () => {

  // TC84103 — Confirm Delete button removes the user from the workspace
  test('members table column headers are visible and Edit member link is reachable', async ({ page }) => {
    const loginPage          = new LoginPage(page);
    const dashboardPage      = new DashboardPage(page);
    const accountsListPage   = new AccountsListPage(page);
    const accountMembersPage = new AccountMembersPage(page);

    // Navigate to app and log in
    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    // Open Profile Menu → Accounts
    await dashboardPage.navigateToAccounts();

    // Assert the Accounts list heading is visible (confirms navigation)
    await expect(accountsListPage.pageHeading).toBeVisible({ timeout: 60000 });

    // Click "View" on the first account row to open the members page
    await accountsListPage.clickView();

    // Assert all 5 members table column headers are visible
    await expect(accountMembersPage.userColumnHeader).toBeVisible({ timeout: 60000 });
    await expect(accountMembersPage.friendlyCodeColumnHeader).toBeVisible({ timeout: 60000 });
    await expect(accountMembersPage.emailColumnHeader).toBeVisible({ timeout: 60000 });
    await expect(accountMembersPage.phoneNumberColumnHeader).toBeVisible({ timeout: 60000 });
    await expect(accountMembersPage.rolesColumnHeader).toBeVisible({ timeout: 60000 });

    // Click "Edit" on the first member row — confirms the Edit member page is reachable
    // TODO: add assertions on the Edit Member page (Delete button, Admin toggle, etc.)
    await accountMembersPage.clickEditMember();
  });

});
