/**
 * Test Case ID: TC64137
 * Description: Test functionality of the User button Privacy Policy
 * Migrated from: muuk-tests/Frame_Module/TestSteps_ebfe7e15.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64137 – User profile menu: Privacy Policy opens navgar.com/privacy-policy', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover profile icon then open the profile menu
  await framePage.hoverProfileMenu();
  await framePage.openProfileMenu();

  // Hover then click "Privacy Policy"
  await page.locator("//A[contains(text(),'Privacy Policy')]").hover({ timeout: 60000 });
  await page.locator("//A[contains(text(),'Privacy Policy')]").click({ timeout: 60000 });

  // Wait for new tab and verify Privacy Policy page
  const newPage = await context.waitForEvent('page');
  await newPage.waitForLoadState('domcontentloaded');
  await expect(newPage.locator("//H1[contains(text(),'Privacy Policy')]")).toBeVisible({ timeout: 30000 });
  await expect(
    newPage.locator("//P[normalize-space() = 'This Privacy Policy describes how Navgar, Inc.']").first()
    .or(
      newPage.locator("//P[contains(text(),'This Privacy Policy describes how Navgar')]").first()
    )
  ).toBeVisible({ timeout: 30000 });
});
