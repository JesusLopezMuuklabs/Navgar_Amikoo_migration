/**
 * Test Case ID: TC64563
 * Description: Cancel Reminder
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b5b167a.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64563 – Cancel Reminder (set then clear)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open reminders drawer
  await framePage.hoverRemindersButton();
  await framePage.openRemindersDrawer();

  // Fill reminder text and choose "In 3hrs"
  await framePage.fillReminderText('Reminder');
  await framePage.clickReminderTime('In 3hrs');

  // Hover reminder item to verify it's in the list
  await expect(page.locator("//P[contains(text(),'Reminder')]").nth(1)).toBeVisible({ timeout: 30000 });

  // Hover the Clear span, then click Clear button (cancel/clear reminder)
  await page.locator("//SPAN[contains(text(),'Clear')]").hover({ timeout: 60000 });
  await framePage.clearReminder();

  // Verify update success toast
  await framePage.verifyReminderUpdatedSuccessfully();
});
