/**
 * Test Case ID: TC64529
 * Description: Reminders trigger a notification and a message that appears in the top right hand side of the screen
 * Migrated from: muuk-tests/Frame_Module/TestSteps_296735e4.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64529 – Reminders: trigger a notification message in top-right', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open reminders drawer
  await framePage.hoverRemindersButton();
  await framePage.openRemindersDrawer();

  // Fill reminder text and select 20 min option
  await framePage.fillReminderText('Reminder Text');
  await framePage.clickReminderTime('in 20 min');

  // Verify created success toast
  await framePage.verifyReminderCreatedSuccessfully();

  // Hover reminder item in the list to verify it is visible
  await expect(page.locator("//P[contains(text(),'Reminder Text')]")).toBeVisible({ timeout: 30000 });

  // Hover the Clear span, then click Clear
  await page.locator("//SPAN[contains(text(),'Clear')]").hover({ timeout: 60000 });
  await framePage.clearReminder();

  // Verify update success toast
  await framePage.verifyReminderUpdatedSuccessfully();
});
