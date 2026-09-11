/**
 * Test Case ID: TC64128
 * Description: Test functionality of the User button Accounts
 * Migrated from: muuk-tests/Frame_Module/TestSteps_ebfc53f6.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64128 – User profile menu: Accounts navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover profile icon, then open the profile menu
  await framePage.hoverProfileMenu();
  await framePage.openProfileMenu();

  // Hover and verify menu items are visible
  await expect(page.locator("//A[contains(text(),'Profile')]").nth(1)).toBeVisible({ timeout: 30000 });
  await page.locator("//A[contains(text(),'Password')]").hover({ timeout: 60000 });
  await page.locator("//A[contains(text(),'Connected Accounts')]").hover({ timeout: 60000 });
  await page.locator("//A[contains(text(),'Billing')]").hover({ timeout: 60000 });

  // Click "Profile" and verify Edit Profile page
  await framePage.clickProfileMenuItem('Profile');
  await framePage.verifyEditProfileHeader();

  // Re-open menu, go to Password
  await framePage.openProfileMenu();
  await page.locator("//A[contains(text(),'Password')]").click({ timeout: 60000 });
  await framePage.verifyUpdatePasswordHeader();

  // Re-open menu, go to Billing
  await framePage.openProfileMenu();
  await page.locator("//A[contains(text(),'Billing')]").click({ timeout: 60000 });
  await framePage.verifyBillingHeader();

  // Re-open menu, go to Accounts
  await framePage.openProfileMenu();
  await page.locator("//A[contains(text(),'Accounts')]").nth(2).click({ timeout: 60000 });
  await framePage.verifyAccountsHeader();

  // Verify specific account entries visible
  await expect(page.locator("//SPAN[contains(text(),'MuukTest - Feature Flag Environment')]")).toBeVisible({ timeout: 30000 });
  await expect(page.locator("//SPAN[contains(text(),'MuukTest - Production Environment')]")).toBeVisible({ timeout: 30000 });
});
