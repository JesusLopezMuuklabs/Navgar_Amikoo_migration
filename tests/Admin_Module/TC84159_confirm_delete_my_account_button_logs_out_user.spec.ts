import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84159 - Confirm Delete my account button will log out the user and remove their account from the system
 * Original: muuk-tests/Admin_Module/TestSteps_a4fb0e6e.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Profile
 *   3. Assert Edit Profile heading is visible
 *   4. Assert "Delete my account" button and "Are you sure?" modal trigger are reachable
 *   5. Assert Cancel button is visible in the modal
 *   Note: Test stops at modal assertion to avoid actually deleting the account.
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84159 - Confirm Delete my account button will log out the user and remove their account', async ({ page }) => {
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

  // Assert Delete my account button is visible
  await expect(page.locator('//BUTTON[@type=\'submit\'][normalize-space() = "Delete my account"]')).toBeVisible({ timeout: 60000 });

  // Click Delete my account to trigger the confirmation dialog
  await adminPage.clickDeleteMyAccount();

  // Assert Are you sure? modal appeared
  await adminPage.assertAreYouSureVisible();

  // Click Cancel to dismiss without deleting
  await adminPage.clickCancelModal();
});
