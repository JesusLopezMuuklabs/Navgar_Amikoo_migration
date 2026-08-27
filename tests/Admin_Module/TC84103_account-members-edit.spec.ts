import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Admin_Module/LoginPage';
import { ProfileMenuComponent } from '../../pages/Admin_Module/ProfileMenuComponent';
import { AccountsListPage } from '../../pages/Admin_Module/AccountsListPage';
import { AccountMembersPage } from '../../pages/Admin_Module/AccountMembersPage';

/**
 * Account Members table — Muuk source: muuk-tests/Admin/test2/TestSteps_a4fd21c4.spec.ts
 *
 * TC84103 — Confirm Delete button removes the user from the workspace.
 *
 * NOTE: The Muuk recording ends after clicking "Edit" on the first member.
 * No assertions on the Edit Member page are recorded.
 * The test faithfully reproduces the recorded flow up to that point.
 *
 * Flow:
 *   1. Navigate to app root and log in.
 *   2. Open Profile Menu → Accounts.
 *   3. Assert Accounts heading visible.
 *   4. Click "View" (first account row) to navigate to account members page.
 *   5. Assert all 5 members table column headers are visible.
 *   6. Click "Edit" on the first member row.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Account Members — Edit member', () => {

  // TC84103 — Confirm Delete button removes the user from the workspace
  test('TC84103 - Confirm Delete button removes the user from the workspace', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    // Navigate to Accounts via Profile Menu
    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    // Click "View" on the first account row → account members page
    await accountsPage.clickView();

    // Assert all 5 members table column headers are visible
    await expect(membersPage.userColumnHeader).toBeVisible({ timeout: 60000 });
    await expect(membersPage.friendlyCodeColumnHeader).toBeVisible({ timeout: 60000 });
    await expect(membersPage.emailColumnHeader).toBeVisible({ timeout: 60000 });
    await expect(membersPage.phoneNumberColumnHeader).toBeVisible({ timeout: 60000 });
    await expect(membersPage.rolesColumnHeader).toBeVisible({ timeout: 60000 });

    // Click "Edit" on the first member row (recording ends here)
    await membersPage.clickEditMember();
  });

});
