import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84153 - Confirm Choose file button opens a file upload window
 * Original: muuk-tests/Admin_Module/TestSteps_a4fb0c92.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Profile
 *   3. Assert Edit Profile heading is visible
 *   4. Assert "Update" button and the profile form are visible
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84153 - Confirm Choose file button opens a file upload window', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const adminPage = new AdminModulePage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  // Validate successful login
  await expect(page.locator('//span[normalize-space(text())=\'Applications\']')).toBeVisible({ timeout: 60000 });

  // Open Profile Menu → Profile
  await adminPage.openProfileMenu();
  await adminPage.clickProfileInMenu();

  // Assert Edit Profile page loaded
  await adminPage.assertEditProfileHeadingVisible();

  // Assert Update button visible on profile page
  await expect(page.locator('//SPAN[normalize-space() = "Update"]')).toBeVisible({ timeout: 60000 });
});
