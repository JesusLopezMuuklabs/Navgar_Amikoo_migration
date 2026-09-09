import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84158 - Confirm phone numbers can be added to the account
 * Original: muuk-tests/Admin_Module/TestSteps_a4fb0e2f.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Profile
 *   3. Assert Edit Profile heading is visible
 *   4. Assert "Phone numbers" label and "Add phone" link are visible
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84158 - Confirm phone numbers can be added to the account', async ({ page }) => {
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

  // Assert Phone numbers label and Add phone link visible
  await adminPage.assertPhoneNumbersLabelVisible();
  await expect(page.locator('//A[normalize-space() = "Add phone"]')).toBeVisible({ timeout: 60000 });
});
