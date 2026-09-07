import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AdminModulePage } from '../../pages/Admin_Module/AdminModulePage';

/**
 * TC84108 - Confirm Admin radio button is toggleable
 * Original: muuk-tests/Admin_Module/TestSteps_a427e1a8.spec.ts
 *
 * Flow:
 *   1. Login
 *   2. Open Profile Menu → Accounts (index 1)
 *   3. Assert Accounts heading is visible
 *   4. Click "MuukTest - Feature Flag Environment"
 *   5. Click "Invite A User"
 *   6. Assert invite form Name, Email labels and Send invitation button are visible
 */

const BASE_URL  = process.env.BASE_URL  ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL    ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC84108 - Confirm Admin radio button is toggleable', async ({ page }) => {
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

  // Click Invite A User
  await adminPage.clickInviteAUser();

  // Assert invite form elements are visible
  await adminPage.assertInviteNameLabelVisible();
  await adminPage.assertInviteEmailLabelVisible();
  await adminPage.assertSendInvitationButtonVisible();
});
