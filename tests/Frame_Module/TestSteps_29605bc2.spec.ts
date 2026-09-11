/**
 * Test Case ID: TC64513
 * Description: Reminders button opens right side drawer
 * Migrated from: muuk-tests/Frame_Module/TestSteps_29605bc2.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64513 – Reminders button opens right side drawer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Hover the reminders bell button then click it to open the drawer
  await framePage.hoverRemindersButton();
  await framePage.openRemindersDrawer();

  // Click reminder text input to confirm drawer opened
  await framePage.page.locator("INPUT[name='content_plain'][placeholder='Remind me about...'][type='text']").click({ timeout: 60000 });

  // Type reminder text
  await page.keyboard.type('Reminder Text');

  // Click "in 20 min" option
  await framePage.click20MinReminderOption();

  // Hover reminder item to confirm it was created
  await expect(framePage.page.locator("//P[contains(text(),'Reminder Text')]")).toBeVisible({ timeout: 30000 });

  // Hover "Clear" span
  await framePage.page.locator("//SPAN[contains(text(),'Clear')]").hover({ timeout: 60000 });

  // Click the Clear button to reset
  await framePage.clearReminder();

  // Verify success toast
  await framePage.verifyReminderUpdatedSuccessfully();
});
