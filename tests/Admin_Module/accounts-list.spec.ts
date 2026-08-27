import { test, expect } from '@playwright/test';
import { LoginPage }            from '../../pages/Admin_Module/LoginPage';
import { ProfileMenuComponent } from '../../pages/Admin_Module/ProfileMenuComponent';
import { AccountsListPage }     from '../../pages/Admin_Module/AccountsListPage';

/**
 * Admin Module — Accounts List
 *
 * Covers: TC84091, TC84092, TC84093
 * Source: muuk-tests/Admin/test1
 *   TestSteps_a4fbc209 (TC84091)
 *   TestSteps_a4fbc25c (TC84092)
 *   TestSteps_a4fbc2a7 (TC84093)
 *
 * Required env vars:
 *   BASE_URL            — app root (e.g. https://dashboard.staging.navgar.app/)
 *   TEST_USER_EMAIL     — login email
 *   TEST_USER_PASSWORD  — login password
 */

test.describe('Admin — Accounts List', () => {

  // ── TC84091 ────────────────────────────────────────────────────────────────
  // Original: "Confirm account name appears in Accounts list"
  test('TC84091 — account name rows appear in the Accounts list', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

    await profileMenu.navigateToAccounts();

    // Assert the Accounts heading is visible (confirms navigation succeeded)
    await expect(accountsPage.pageHeading).toBeVisible();

    // TC84091 asserts that both MuukTest td cells are visible
    await expect(accountsPage.muukTestRow).toBeVisible();
    await expect(accountsPage.muukTestRowSecond).toBeVisible();
  });

  // ── TC84092 ────────────────────────────────────────────────────────────────
  // Original: "Confirm account avatar appears in Accounts list"
  test('TC84092 — account avatar appears in the Accounts list', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

    await profileMenu.navigateToAccounts();

    // Assert the Accounts heading is visible (confirms navigation succeeded)
    await expect(accountsPage.pageHeading).toBeVisible();

    // TC84092 asserts the MuukTest avatar image is visible in the list
    await expect(accountsPage.muukTestAvatar).toBeVisible();
  });

  // ── TC84093 ────────────────────────────────────────────────────────────────
  // Original: "Confirm ability to switch between accounts"
  test('TC84093 — user can switch to the Feature Flag account', async ({ page }) => {
    const loginPage    = new LoginPage(page);
    const profileMenu  = new ProfileMenuComponent(page);
    const accountsPage = new AccountsListPage(page);

    await loginPage.goto(process.env.BASE_URL!);
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

    await profileMenu.navigateToAccounts();

    // Assert Accounts page loaded
    await expect(accountsPage.pageHeading).toBeVisible();

    // Click the Switch link for the Feature Flag account
    await accountsPage.switchToFeatureFlagAccount();

    // After switching: "Current Account" badge becomes visible and Switch link disappears
    await expect(accountsPage.featureFlagCurrentBadge).toBeVisible();
    await expect(accountsPage.featureFlagSwitchLink).not.toBeVisible();
  });

});
