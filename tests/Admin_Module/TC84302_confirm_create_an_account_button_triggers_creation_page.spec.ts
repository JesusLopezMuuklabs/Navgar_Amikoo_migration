import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84302 - Confirm Create an Account button triggers account creation page
 * Original: muuk-tests/Admin_Module/TestSteps_03826239.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Profile
 *   3. Assert Edit Profile heading is visible
 *   4. Click Accounts in the profile sidebar (index 2)
 *   5. Assert Accounts heading is visible
 *   6. Click "Create an Account"
 *   7. Assert New Account heading is visible
 *   8. Assert Account Name and Default language labels visible
 *   9. Click "Create Account" button
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84302 - Confirm Create an Account button triggers account creation page', async ({ page }) => {
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

  // Click Accounts in profile sidebar
  await adminPage.clickAccountsInSidebar();

  // Assert Accounts heading visible
  await adminPage.assertAccountsHeadingVisible();

  // Click "Create an Account"
  await adminPage.clickCreateAnAccount();

  // Assert New Account form is loaded
  await adminPage.assertNewAccountHeadingVisible();
  await adminPage.assertNewAccountNameLabelVisible();
  await adminPage.assertNewAccountDefaultLanguageLabelVisible();

  // Click "Create Account" button
  await adminPage.clickCreateAccount();
});
