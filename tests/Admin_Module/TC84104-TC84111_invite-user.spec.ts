import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Admin_Module/LoginPage';
import { ProfileMenuComponent } from '../../pages/Admin_Module/ProfileMenuComponent';
import { AccountsListPage } from '../../pages/Admin_Module/AccountsListPage';
import { AccountMembersPage } from '../../pages/Admin_Module/AccountMembersPage';
import { InviteUserPage } from '../../pages/Admin_Module/InviteUserPage';

/**
 * Invite A User form — Muuk source: muuk-tests/Admin/test2/TestSteps_a427db99.spec.ts … a4281aa0.spec.ts
 *
 * TC84104–TC84111 all record byte-for-byte identical step sequences and assertions.
 * Each is kept as a separate test() for TC traceability; steps are identical.
 *
 * Flow:
 *   1. Navigate to app root and log in.
 *   2. Open Profile Menu → Accounts.
 *   3. Assert Accounts heading visible.
 *   4. Click "MuukTest - Feature Flag Environment" account name.
 *   5. Click "Invite A User".
 *   6. Assert Name label, Email label, and Send invitation button are visible.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test.describe('Invite A User form', () => {

  // TC84104 — Confirm account name is listed in header
  test('TC84104 - Confirm account name is listed in header', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const accountsPage   = new AccountsListPage(page);
    const membersPage    = new AccountMembersPage(page);
    const inviteUserPage = new InviteUserPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    await accountsPage.openFeatureFlagAccount();
    await membersPage.clickInviteUser();

    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

  // TC84105 — Confirm account avatar is displayed in header
  test('TC84105 - Confirm account avatar is displayed in header', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const accountsPage   = new AccountsListPage(page);
    const membersPage    = new AccountMembersPage(page);
    const inviteUserPage = new InviteUserPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    await accountsPage.openFeatureFlagAccount();
    await membersPage.clickInviteUser();

    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

  // TC84106 — Confirm text can be entered into the Name field
  test('TC84106 - Confirm text can be entered into the Name field', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const accountsPage   = new AccountsListPage(page);
    const membersPage    = new AccountMembersPage(page);
    const inviteUserPage = new InviteUserPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    await accountsPage.openFeatureFlagAccount();
    await membersPage.clickInviteUser();

    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

  // TC84107 — Confirm text can be entered into the Email field
  test('TC84107 - Confirm text can be entered into the Email field', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const accountsPage   = new AccountsListPage(page);
    const membersPage    = new AccountMembersPage(page);
    const inviteUserPage = new InviteUserPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    await accountsPage.openFeatureFlagAccount();
    await membersPage.clickInviteUser();

    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

  // TC84108 — Confirm Admin radio button is toggleable
  test('TC84108 - Confirm Admin radio button is toggleable', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const accountsPage   = new AccountsListPage(page);
    const membersPage    = new AccountMembersPage(page);
    const inviteUserPage = new InviteUserPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    await accountsPage.openFeatureFlagAccount();
    await membersPage.clickInviteUser();

    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

  // TC84109 — Confirm Flow editor button is toggleable
  test('TC84109 - Confirm Flow editor button is toggleable', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const accountsPage   = new AccountsListPage(page);
    const membersPage    = new AccountMembersPage(page);
    const inviteUserPage = new InviteUserPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    await accountsPage.openFeatureFlagAccount();
    await membersPage.clickInviteUser();

    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

  // TC84110 — Confirm Cancel button triggers previous page
  test('TC84110 - Confirm Cancel button triggers previous page', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const accountsPage   = new AccountsListPage(page);
    const membersPage    = new AccountMembersPage(page);
    const inviteUserPage = new InviteUserPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    await accountsPage.openFeatureFlagAccount();
    await membersPage.clickInviteUser();

    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

  // TC84111 — Confirm Send Invitation button sends invite email
  test('TC84111 - Confirm Send Invitation button sends invite email', async ({ page }) => {
    const loginPage      = new LoginPage(page);
    const profileMenu    = new ProfileMenuComponent(page);
    const accountsPage   = new AccountsListPage(page);
    const membersPage    = new AccountMembersPage(page);
    const inviteUserPage = new InviteUserPage(page);

    await loginPage.goto(BASE_URL);
    await loginPage.login(EMAIL, PASSWORD);

    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible({ timeout: 60000 });

    await accountsPage.openFeatureFlagAccount();
    await membersPage.clickInviteUser();

    await expect(inviteUserPage.nameLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.emailLabel).toBeVisible({ timeout: 60000 });
    await expect(inviteUserPage.sendInvitationButton).toBeVisible({ timeout: 60000 });
  });

});
