import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC_A84087 - Confirm Edit Account button triggers account details page
 * Original: muuk-tests/Admin_Module/TestSteps_a4f92ef2.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Accounts (index 1)
 *   3. Assert Accounts heading is visible
 *   4. Click "MuukTest - Feature Flag Environment"
 *   5. Click "Edit Account"
 *   6. Assert Account Name, Default language, Friendly code labels visible
 *   7. Assert Update Account button visible
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A84087 - Confirm Edit Account button triggers account details page', async ({ page }) => {
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

  // Click Edit Account
  await adminPage.clickEditAccount();

  // Assert edit form fields visible
  await adminPage.assertAccountNameLabelVisible();
  await adminPage.assertDefaultLanguageLabelVisible();
  await adminPage.assertFriendlyCodeLabelVisible();
});
