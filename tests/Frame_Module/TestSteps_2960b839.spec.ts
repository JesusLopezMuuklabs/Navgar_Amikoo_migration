/**
 * Test Case ID: TC64516
 * Description: Reminders Create 20 min reminder
 * Migrated from: muuk-tests/Frame_Module/TestSteps_2960b839.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64516 – Reminders: Create 20 min reminder', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open reminders drawer
  await framePage.hoverRemindersButton();
  await framePage.openRemindersDrawer();

  // Fill reminder text and select 20 min timing
  await framePage.fillReminderText('Reminder 20 min');
  await framePage.clickReminderTime('in 20 min');

  // Verify the reminder appears in the list
  await expect(page.locator("//P[contains(text(),'Reminder 20 min')]")).toBeVisible({ timeout: 30000 });

  // Hover the "Clear" span then click Clear button
  await page.locator("//SPAN[contains(text(),'Clear')]").hover({ timeout: 60000 });
  await framePage.clearReminder();

  // Verify update success toast
  await framePage.verifyReminderUpdatedSuccessfully();
});
