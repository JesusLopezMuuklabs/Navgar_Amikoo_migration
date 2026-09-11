/**
 * Test Case ID: TC64518
 * Description: Reminder Create custom reminder
 * Migrated from: muuk-tests/Frame_Module/TestSteps_2960cf01.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64518 – Reminders: Create custom reminder (date picker)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open reminders drawer
  await framePage.hoverRemindersButton();
  await framePage.openRemindersDrawer();

  // Fill reminder text and choose Custom date
  await framePage.fillReminderText('Reminder');
  await framePage.clickCustomTab();

  // Hover today in the date picker, then click the next day (tomorrow)
  await framePage.hoverTodayInCalendar();
  await framePage.clickTomorrowInCalendar();
  await framePage.clickOkInDatePicker();

  // Verify "Tomorrow" label is shown
  await framePage.verifyTomorrowLabelVisible();

  // Hover reminder item in list
  await expect(page.locator("//P[contains(text(),'Reminder')]").nth(1)).toBeVisible({ timeout: 30000 });

  // Hover then click Clear
  await page.locator("//SPAN[contains(text(),'Clear')]").hover({ timeout: 60000 });
  await framePage.clearReminder();

  // Verify update success toast
  await framePage.verifyReminderUpdatedSuccessfully();
});
