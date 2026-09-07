import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84100 - Confirm Admin radio button is toggleable (account permissions)
 * Original: muuk-tests/Admin_Module/TestSteps_a4fd1e23.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Accounts (index 1)
 *   3. Assert Accounts heading is visible
 *   4. Click "MuukTest - Feature Flag Environment"
 *   5. Assert account detail heading and User/Friendly code/Email/Phone/Roles table headers visible
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84100 - Confirm Admin radio button is toggleable (account permissions)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const adminPage = new AdminModulePage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  // Validate successful login
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  // Open Profile Menu → Accounts
  await adminPage.openProfileMenu();
  await adminPage.clickAccountsInProfileMenu();

  // Assert Accounts list loaded
  await adminPage.assertAccountsHeadingVisible();

  // Click Feature Flag Environment account
  await adminPage.clickFeatureFlagEnvironment();

  // Assert account detail page and permissions table columns
  await expect(page.locator('//H1[normalize-space() = "MuukTest - Feature Flag Environment"]')).toBeVisible({ timeout: 60000 });
  await adminPage.assertUserTableHeaderVisible();
  await adminPage.assertFriendlyCodeTableHeaderVisible();
  await adminPage.assertEmailTableHeaderVisible();
  await adminPage.assertPhoneNumberTableHeaderVisible();
  await adminPage.assertRolesTableHeaderVisible();
});
