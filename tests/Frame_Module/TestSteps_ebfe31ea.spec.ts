/**
 * Test Case ID: TC64135
 * Description: Test functionality of the User button Terms of Service
 * Migrated from: muuk-tests/Frame_Module/TestSteps_ebfe31ea.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64135 – User profile menu: Terms of Service opens navgar.com/terms-of-service', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover profile icon then open the profile menu
  await framePage.hoverProfileMenu();
  await framePage.openProfileMenu();

  // Hover then click "Terms of Service"
  await page.locator("//A[contains(text(),'Terms of Service')]").hover({ timeout: 60000 });
  await page.locator("//A[contains(text(),'Terms of Service')]").click({ timeout: 60000 });

  // Wait for new tab and verify Terms of Service page
  const newPage = await context.waitForEvent('page');
  await newPage.waitForLoadState('domcontentloaded');
  await expect(newPage.locator("//div[@class='header-title-nav-wrapper']")).toBeVisible({ timeout: 30000 });
  await expect(newPage.locator("//H2[contains(text(),'Terms of Service')]")).toBeVisible({ timeout: 30000 });
});
