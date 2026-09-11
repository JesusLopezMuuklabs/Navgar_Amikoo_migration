/**
 * Test Case ID: TC64524
 * Description: Reminders Check that URLs hyperlink in reminder display field
 * Migrated from: muuk-tests/Frame_Module/TestSteps_29638330.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64524 – Reminders: URLs hyperlink in reminder display field', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  let numberPages = 1;
  let pageUpdated = false;
  context.on('page', async () => { numberPages++; pageUpdated = true; });

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open reminders drawer
  await framePage.hoverRemindersButton();
  await framePage.openRemindersDrawer();

  // Fill a URL as reminder text and select 20 min
  await framePage.fillReminderText('www.google.com');
  await framePage.clickReminderTime('in 20 min');

  // Verify creation success
  await framePage.verifyReminderCreatedSuccessfully();

  // Hover then click the hyperlink
  await expect(page.locator("//A[contains(text(),'www.google.com')]")).toBeVisible({ timeout: 30000 });
  await page.locator("//A[contains(text(),'www.google.com')]").click({ timeout: 60000 });

  // Wait for new tab to open and verify it is google.com
  let maxRetries = 0;
  while (!pageUpdated && maxRetries++ < 600) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  pageUpdated = false;
  await expect(page.url()).toContain('google.com/');

  // Wait then close the new tab, go back to the original
  await page.waitForTimeout(2000);
  await page.close();
  numberPages--;
  const pages = await context.pages();
  const mainPage = pages[numberPages - 1];

  // Clear the reminder on the original page
  await mainPage.locator("//SPAN[contains(text(),'Clear')]").hover({ timeout: 60000 });
  await mainPage.locator("//BUTTON[@role='button'][@type='button'][normalize-space() = 'Clear']").click({ timeout: 60000 });
  await expect(
    mainPage.locator("//DIV[contains(text(),'The reminder has been updated successful')]")
  ).toBeVisible({ timeout: 30000 });
});
