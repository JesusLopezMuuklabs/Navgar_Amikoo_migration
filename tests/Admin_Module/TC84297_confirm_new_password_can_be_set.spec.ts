import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84297 - Confirm new password can be set
 * Original: muuk-tests/Admin_Module/TestSteps_03825ac9.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Profile
 *   3. Assert Edit Profile heading is visible
 *   4. Click Password tab
 *   5. Assert Update Password heading and form labels are visible
 *   6. Click Update (submit) button
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84297 - Confirm new password can be set', async ({ page }) => {
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

  // Assert Edit Profile page is loaded
  await adminPage.assertEditProfileHeadingVisible();

  // Navigate to Password tab
  await adminPage.clickPasswordTab();

  // Assert Update Password page content
  await adminPage.assertUpdatePasswordHeadingVisible();
  await adminPage.assertCurrentPasswordLabelVisible();
  await adminPage.assertNewPasswordLabelVisible();
  await adminPage.assertNewPasswordConfirmationLabelVisible();

  // Click the Update (submit) button
  await adminPage.clickUpdatePasswordButton();
});
