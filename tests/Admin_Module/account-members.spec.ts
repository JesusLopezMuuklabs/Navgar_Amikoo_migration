import { test, expect } from '@playwright/test';
import { LoginPage }            from '../../pages/Admin_Module/LoginPage';
import { ProfileMenuComponent } from '../../pages/Admin_Module/ProfileMenuComponent';
import { AccountsListPage }     from '../../pages/Admin_Module/AccountsListPage';
import { AccountMembersPage }   from '../../pages/Admin_Module/AccountMembersPage';

/**
 * Admin Module — Account Members Page
 *
 * Covers: TC84094, TC84097, TC84098, TC84099, TC84100, TC84101, TC84102
 * Source: muuk-tests/Admin/test1
 *   TestSteps_a4fbda3d (TC84094)
 *   TestSteps_a4fcaf53 (TC84097)
 *   TestSteps_a4fd1b74 (TC84098)
 *   TestSteps_a4fd1daa (TC84099)
 *   TestSteps_a4fd1e23 (TC84100)
 *   TestSteps_a4fd1e9c (TC84101)
 *   TestSteps_a4fd2124 (TC84102)
 *
 * ⚠️  NOTE ON TC84097–TC84102: All six Muuk sources (TC84097 through TC84102)
 * produce the exact same step sequence and assertions at runtime. The test
 * descriptions differ but no additional step or distinguishing assertion
 * exists in the recorded steps. They are retained as separate tests for
 * traceability to the original Test Case IDs; the QA team should review
 * whether they represent intentionally distinct scenarios or can be reduced.
 *
 * Required env vars:
 *   BASE_URL            — app root (e.g. https://dashboard.staging.navgar.app/)
 *   TEST_USER_EMAIL     — login email
 *   TEST_USER_PASSWORD  — login password
 */

test.describe('Admin — Account Members Page', () => {

  /**
   * Shared navigation helper: login → Profile Menu → Accounts → View (first account).
   * Returns instantiated POMs ready for assertions.
   */
  async function navigateToMembersPage(page: Parameters<typeof test>[1] extends (...a: infer A) => unknown ? A[0] extends { page: infer P } ? P : never : never) {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await profileMenu.navigateToAccounts();
    // Wait for the Accounts heading before clicking View
    await expect(accountsPage.pageHeading).toBeVisible();
    await accountsPage.clickView();

    return membersPage;
  }

  // ── TC84094 ────────────────────────────────────────────────────────────────
  // Original: "Confirm View button triggers account permissions page"
  test('TC84094 — View button navigates to the account members page', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible();
    await accountsPage.clickView();

    // Assert all five members-table column headers are visible
    await expect(membersPage.userColumnHeader).toBeVisible();
    await expect(membersPage.friendlyCodeColumnHeader).toBeVisible();
    await expect(membersPage.emailColumnHeader).toBeVisible();
    await expect(membersPage.phoneNumberColumnHeader).toBeVisible();
    await expect(membersPage.rolesColumnHeader).toBeVisible();
  });

  // ── TC84097 ────────────────────────────────────────────────────────────────
  // Original: "Confirm workspace account name is listed in header"
  // ⚠️ Steps are identical to TC84098–TC84102 — see note above.
  test('TC84097 — workspace account name header is present; Edit member link is reachable', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible();
    await accountsPage.clickView();

    // Assert all five members-table column headers are visible
    await expect(membersPage.userColumnHeader).toBeVisible();
    await expect(membersPage.friendlyCodeColumnHeader).toBeVisible();
    await expect(membersPage.emailColumnHeader).toBeVisible();
    await expect(membersPage.phoneNumberColumnHeader).toBeVisible();
    await expect(membersPage.rolesColumnHeader).toBeVisible();

    // Click Edit on the first member (the Muuk test navigates here but asserts nothing further)
    await membersPage.clickEditMember();
  });

  // ── TC84098 ────────────────────────────────────────────────────────────────
  // Original: "Confirm user account name is listed in header"
  // ⚠️ Steps are identical to TC84097 — see note above.
  test('TC84098 — user account name header is present; Edit member link is reachable', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible();
    await accountsPage.clickView();

    await expect(membersPage.userColumnHeader).toBeVisible();
    await expect(membersPage.friendlyCodeColumnHeader).toBeVisible();
    await expect(membersPage.emailColumnHeader).toBeVisible();
    await expect(membersPage.phoneNumberColumnHeader).toBeVisible();
    await expect(membersPage.rolesColumnHeader).toBeVisible();

    await membersPage.clickEditMember();
  });

  // ── TC84099 ────────────────────────────────────────────────────────────────
  // Original: "Confirm account avatar is displayed in header"
  // ⚠️ Steps are identical to TC84097 — see note above.
  test('TC84099 — account avatar is displayed in header; Edit member link is reachable', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible();
    await accountsPage.clickView();

    await expect(membersPage.userColumnHeader).toBeVisible();
    await expect(membersPage.friendlyCodeColumnHeader).toBeVisible();
    await expect(membersPage.emailColumnHeader).toBeVisible();
    await expect(membersPage.phoneNumberColumnHeader).toBeVisible();
    await expect(membersPage.rolesColumnHeader).toBeVisible();

    await membersPage.clickEditMember();
  });

  // ── TC84100 ────────────────────────────────────────────────────────────────
  // Original: "Confirm Admin radio button is toggleable"
  // ⚠️ Steps are identical to TC84097 — see note above.
  test('TC84100 — Admin radio button is toggleable; Edit member page is reachable', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible();
    await accountsPage.clickView();

    await expect(membersPage.userColumnHeader).toBeVisible();
    await expect(membersPage.friendlyCodeColumnHeader).toBeVisible();
    await expect(membersPage.emailColumnHeader).toBeVisible();
    await expect(membersPage.phoneNumberColumnHeader).toBeVisible();
    await expect(membersPage.rolesColumnHeader).toBeVisible();

    // Navigate to the Edit member page (where the Admin radio is located)
    await membersPage.clickEditMember();
  });

  // ── TC84101 ────────────────────────────────────────────────────────────────
  // Original: "Confirm Flow editor button is toggleable"
  // ⚠️ Steps are identical to TC84097 — see note above.
  test('TC84101 — Flow editor button is toggleable; Edit member page is reachable', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible();
    await accountsPage.clickView();

    await expect(membersPage.userColumnHeader).toBeVisible();
    await expect(membersPage.friendlyCodeColumnHeader).toBeVisible();
    await expect(membersPage.emailColumnHeader).toBeVisible();
    await expect(membersPage.phoneNumberColumnHeader).toBeVisible();
    await expect(membersPage.rolesColumnHeader).toBeVisible();

    await membersPage.clickEditMember();
  });

  // ── TC84102 ────────────────────────────────────────────────────────────────
  // Original: "Confirm Update Account user button saves changes to the account permissions"
  // ⚠️ Steps are identical to TC84097 — see note above.
  test('TC84102 — Update Account user button saves changes; Edit member page is reachable', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);
    const membersPage  = new AccountMembersPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await profileMenu.navigateToAccounts();
    await expect(accountsPage.pageHeading).toBeVisible();
    await accountsPage.clickView();

    await expect(membersPage.userColumnHeader).toBeVisible();
    await expect(membersPage.friendlyCodeColumnHeader).toBeVisible();
    await expect(membersPage.emailColumnHeader).toBeVisible();
    await expect(membersPage.phoneNumberColumnHeader).toBeVisible();
    await expect(membersPage.rolesColumnHeader).toBeVisible();

    // Navigate to the Edit member page (where Update Account User button is located)
    await membersPage.clickEditMember();
  });

});
