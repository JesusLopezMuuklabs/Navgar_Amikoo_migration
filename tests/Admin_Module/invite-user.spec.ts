// tests/Admin_Module/invite-user.spec.ts
//
// Source TCs: TC84104, TC84105, TC84106, TC84107, TC84108, TC84109, TC84110, TC84111
// Muuk files:  a427db99, a427e03b, a427e0b4, a427e12f, a427e1a8, a427e221, a427e29a, a4281aa0
//
// NOTE — Duplicate analysis:
//   All 8 Muuk source tests record the EXACT same step sequence and assertions.
//   Their descriptions differ (Name field, Email field, Admin radio, Flow editor,
//   Cancel button, Send Invitation button) but none of those elements appear in
//   the recorded steps — all 8 end at the Invite form with the same 3 visibility
//   assertions (Name label, Email label, Send invitation button).
//   A single representative test is generated here. The QA team should add the
//   missing scenario-specific steps (typing in Name/Email, clicking Cancel, etc.)
//   to complete the remaining 7 test cases.

import { test, expect } from '@playwright/test';
import { LoginPage }        from '../../pages/common/LoginPage';
import { DashboardPage }    from '../../pages/common/DashboardPage';
import { AccountsListPage } from '../../pages/Admin_Module/AccountsListPage';
import { AccountMembersPage } from '../../pages/Admin_Module/AccountMembersPage';
import { InviteUserPage }   from '../../pages/Admin_Module/InviteUserPage';

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Invite A User form', () => {

  // TC84104 — representative test for TC84104–TC84111
  // Description: Confirm Invite A User form is accessible and shows all required fields
  test('Invite A User form shows Name label, Email label and Send invitation button', async ({ page }) => {
    const loginPage         = new LoginPage(page);
    const dashboardPage     = new DashboardPage(page);
    const accountsListPage  = new AccountsListPage(page);
    const accountMembersPage = new AccountMembersPage(page);
    const inviteUserPage    = new InviteUserPage(page);

    // Navigate to app and log in
    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    // Open Profile Menu → Accounts
    await dashboardPage.navigateToAccounts();

    // Assert Accounts page heading is visible (confirms successful navigation)
    await expect(accountsListPage.pageHeading).toBeVisible({ timeout: 60000 });

    // Open the Feature Flag Environment account detail/members page
    await accountsListPage.openFeatureFlagAccount();

    // Click "Invite A User" to open the invitation form
    await accountMembersPage.clickInviteUser();

    // Assert all expected form elements are visible on the Invite form
    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

});
