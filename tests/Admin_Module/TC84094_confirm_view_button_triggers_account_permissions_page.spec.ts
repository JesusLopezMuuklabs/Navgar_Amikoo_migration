import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84094 - Confirm View button triggers account permissions page
 * Original: muuk-tests/Admin_Module/TestSteps_a4fbda3d.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Accounts (index 1)
 *   3. Assert Accounts heading is visible
 *   4. Click "View" link
 *   5. Assert account detail / permissions page loaded (Feature Flag Environment heading)
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84094 - Confirm View button triggers account permissions page', async ({ page }) => {
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

  // Click "View" link
  await adminPage.clickView();

  // Assert account detail page loaded (Feature Flag Environment heading)
  await expect(page.locator('//H1[normalize-space() = "MuukTest - Feature Flag Environment"]')).toBeVisible({ timeout: 60000 });
});
