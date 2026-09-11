/**
 * Test Case ID: TC64129
 * Description: Test functionality of the User button About Navgar
 * Migrated from: muuk-tests/Frame_Module/TestSteps_ebfd6542.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64129 – User profile menu: About Navgar opens navgar.com', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover profile icon then open the profile menu
  await framePage.hoverProfileMenu();
  await framePage.openProfileMenu();

  // Hover "About Navgar" then click it
  await page.locator("//A[contains(text(),'About Navgar')]").hover({ timeout: 60000 });
  await page.locator("//A[contains(text(),'About Navgar')]").click({ timeout: 60000 });

  // Verify the URL contains navgar.com (new tab or same tab)
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/navgar\.com/);
});
