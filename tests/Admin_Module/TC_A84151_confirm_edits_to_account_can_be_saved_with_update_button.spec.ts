import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC_A84151 - Confirm edits made to the account can be saved with the Update Account button
 * Original: muuk-tests/Admin_Module/TestSteps_a4f2e331.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Accounts (index 1)
 *   3. Assert Accounts heading is visible
 *   4. Click "MuukTest - Production Environment"
 *   5. Click "Edit Account" (Production)
 *   6. Select "es" language from Default language dropdown
 *   7. Click "Update Account"
 *   8. Assert "Account was successfully updated." message visible
 *   9. Click "Edit Account" again (for Feature Flag Environment)
 *   10. Revert language to "en" and click Update Account
 *   11. Assert success message visible again
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A84151 - Confirm edits made to the account can be saved with the Update Account button', async ({ page }) => {
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

  // Click Production Environment account
  await adminPage.clickProductionEnvironment();

  // Click Edit Account
  await adminPage.clickEditAccount();

  // Change language to Spanish and save
  await adminPage.selectDefaultLanguage('es');
  await adminPage.clickUpdateAccount();

  // Assert success message
  await adminPage.assertAccountUpdatedSuccessVisible();

  // Edit Feature Flag Environment to revert language
  await page.locator('//A[normalize-space() = "Edit Account"]').nth(0).click({ timeout: 60000 });
  await adminPage.selectDefaultLanguage('en');
  await adminPage.clickUpdateAccount();

  // Assert success message again
  await adminPage.assertAccountUpdatedSuccessVisible();
});
