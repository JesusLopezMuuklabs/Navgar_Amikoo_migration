import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84299 - Confirm Sign in with Google button triggers Sign in with Google page
 * Original: muuk-tests/Admin_Module/TestSteps_03825be1.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Profile
 *   3. Assert Edit Profile heading is visible
 *   4. Click Connected Accounts tab
 *   5. Assert Connected Accounts heading is visible
 *   6. Click "Sign in with Google" button
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84299 - Confirm Sign in with Google button triggers Sign in with Google page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const adminPage = new AdminModulePage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  // Validate successful login
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  // Open Profile Menu and navigate to Profile
  await adminPage.openProfileMenu();
  await adminPage.clickProfileInMenu();

  // Assert Edit Profile page loaded
  await adminPage.assertEditProfileHeadingVisible();

  // Navigate to Connected Accounts tab
  await adminPage.clickConnectedAccountsTab();

  // Assert Connected Accounts page loaded
  await adminPage.assertConnectedAccountsHeadingVisible();

  // Click the Sign in with Google button
  await adminPage.clickGoogleButton();
});
