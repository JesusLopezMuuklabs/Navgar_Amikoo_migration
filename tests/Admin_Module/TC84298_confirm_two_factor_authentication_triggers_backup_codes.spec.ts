import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84298 - Confirm Two-factor Authentication button triggers the Backup Codes page
 * Original: muuk-tests/Admin_Module/TestSteps_03825b0a.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Profile
 *   3. Assert Edit Profile heading is visible
 *   4. Click Password tab
 *   5. Assert Two-factor Authentication section is visible
 *   6. Click "Enable two-factor authentication"
 *   7. Assert Backup Codes heading is visible
 *   8. Click Cancel to return to Password page
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84298 - Confirm Two-factor Authentication button triggers the Backup Codes page', async ({ page }) => {
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

  // Navigate to Password tab
  await adminPage.clickPasswordTab();

  // Assert Two-factor Authentication section is present
  await adminPage.assertTwoFactorAuthHeadingVisible();

  // Click "Enable two-factor authentication"
  await adminPage.clickEnableTwoFactor();

  // Assert Backup Codes page loaded
  await adminPage.assertBackupCodesHeadingVisible();

  // Click Cancel to go back
  await adminPage.clickCancelBackupCodes();
});
