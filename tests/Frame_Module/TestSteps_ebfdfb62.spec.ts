/**
 * Test Case ID: TC64133
 * Description: Test functionality of the User button Help
 * Migrated from: muuk-tests/Frame_Module/TestSteps_ebfdfb62.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64133 – User profile menu: Help opens help.navgar.com', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover profile icon then open the profile menu
  await framePage.hoverProfileMenu();
  await framePage.openProfileMenu();

  // Hover then click "Help" link
  await page.locator("//A[contains(text(),'Help')]").hover({ timeout: 60000 });
  await page.locator("//A[contains(text(),'Help')]").click({ timeout: 60000 });

  // Wait for new tab to open and verify help site
  const newPage = await context.waitForEvent('page');
  await newPage.waitForLoadState('domcontentloaded');
  await expect(newPage.locator("//div[@class='header__logo']")).toBeVisible({ timeout: 30000 });
  await expect(newPage.locator("//H1[normalize-space() = 'Advice and answers from the Navgar Team']")).toBeVisible({ timeout: 30000 });
});
