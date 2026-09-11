/**
 * Test Case ID: TC64139
 * Description: Test functionality of the User button Sign Out
 * Migrated from: muuk-tests/Frame_Module/TestSteps_ebfebe16.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64139 – User profile menu: Sign Out returns to the Welcome page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover profile icon then open the profile menu
  await framePage.hoverProfileMenu();
  await framePage.openProfileMenu();

  // Hover Sign Out, then click it
  await page.locator("//BUTTON[@type='submit'][contains(text(),'Sign Out')]").hover({ timeout: 60000 });
  await framePage.clickSignOut();

  // Verify the "Welcome to Navgar" landing page is shown
  await framePage.verifyWelcomeToNavgar();

  // Verify "Log In" and "Sign Up" links are visible
  await expect(page.locator("//A[contains(text(),'Log In')]")).toBeVisible({ timeout: 30000 });
  await expect(page.locator("//A[contains(text(),'Sign Up')]")).toBeVisible({ timeout: 30000 });
});
