/**
 * Test Case ID: TC64145
 * Description: Test functionality of the User button Password
 * Migrated from: muuk-tests/Frame_Module/TestSteps_ebff238f.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64145 – User profile menu: Password navigates to Update Password page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover profile icon then open the profile menu
  await framePage.hoverProfileMenu();
  await framePage.openProfileMenu();

  // Hover "Password" then click it
  await page.locator("//A[contains(text(),'Password')]").hover({ timeout: 60000 });
  await page.locator("//A[contains(text(),'Password')]").click({ timeout: 60000 });

  // Verify Update Password page
  await framePage.verifyUpdatePasswordHeader();
});
