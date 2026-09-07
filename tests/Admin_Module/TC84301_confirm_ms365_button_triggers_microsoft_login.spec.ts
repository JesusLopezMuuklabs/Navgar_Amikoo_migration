import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84301 - Confirm MS 365 button triggers Microsoft login page
 * Original: muuk-tests/Admin_Module/TestSteps_0382604e.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Profile
 *   3. Assert Edit Profile heading is visible
 *   4. Click Connected Accounts tab (index 1)
 *   5. Assert Connected Accounts heading is visible
 *   6. Click "MS 365" button
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84301 - Confirm MS 365 button triggers Microsoft login page', async ({ page }) => {
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

  // Click the MS 365 button
  await adminPage.clickMS365Button();
});
