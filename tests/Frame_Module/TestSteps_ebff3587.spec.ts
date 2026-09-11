/**
 * Test Case ID: TC64146
 * Description: Test functionality of the User button Connected Accounts
 * Migrated from: muuk-tests/Frame_Module/TestSteps_ebff3587.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64146 – User profile menu: Connected Accounts navigates to Connected Accounts page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover profile icon then open the profile menu
  await framePage.hoverProfileMenu();
  await framePage.openProfileMenu();

  // Hover "Connected Accounts" then click it
  await page.locator("//A[contains(text(),'Connected Accounts')]").hover({ timeout: 60000 });
  await page.locator("//A[contains(text(),'Connected Accounts')]").click({ timeout: 60000 });

  // Verify Connected Accounts page
  await framePage.verifyConnectedAccountsHeader();
});
