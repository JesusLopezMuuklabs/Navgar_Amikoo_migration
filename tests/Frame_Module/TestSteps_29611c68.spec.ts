/**
 * Test Case ID: TC64521
 * Description: Reminders Create Recurring reminder
 * Migrated from: muuk-tests/Frame_Module/TestSteps_29611c68.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64521 – Reminders: Create Recurring reminder (MWF, weekly, 00:00)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open reminders drawer
  await framePage.hoverRemindersButton();
  await framePage.openRemindersDrawer();

  // Fill reminder text and click the Recurring tab
  await framePage.fillReminderText('Reminder');
  await framePage.clickRecurringTab();

  // Verify "Recurring reminder" section header is visible
  await framePage.verifyRecurringReminderHeader();

  // Select Weekly recurrence and toggle M, W, F days
  await framePage.selectWeeklyRecurrence();
  await framePage.toggleWeekDay('M');
  await framePage.toggleWeekDay('W');
  await framePage.toggleWeekDay('F');

  // Hover the time label, open time picker, select midnight
  await page.locator("//LABEL[@id='time_config'][contains(text(),'Choose a time for the launch')]").hover({ timeout: 60000 });
  await framePage.openTimePicker();
  await framePage.selectTimeMidnight();

  // Hover and click "Add reminder" button
  await framePage.page.locator("//BUTTON[@type='submit'][contains(text(),'Add reminder')]").hover({ timeout: 60000 });
  await framePage.clickAddReminder();

  // Verify created success toast
  await framePage.verifyReminderCreatedSuccessfully();

  // Verify reminder is visible in list
  await expect(page.locator("//P[contains(text(),'Reminder')]").nth(1)).toBeVisible({ timeout: 30000 });

  // Click the Clear span directly (as in the source) and verify update toast
  await page.locator("//SPAN[contains(text(),'Clear')]").click({ timeout: 60000 });
  await framePage.verifyReminderUpdatedSuccessfully();
});
