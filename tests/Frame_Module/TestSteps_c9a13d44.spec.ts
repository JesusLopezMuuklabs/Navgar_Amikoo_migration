/**
 * Test Case ID: TC64165
 * Description: Main Command Bar Creation selector defaults to Tasks when in the Tasks module
 * Migrated from: muuk-tests/Frame_Module/TestSteps_c9a13d44.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64165 – Command Bar defaults to Tasks when in the Tasks module', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Wait briefly after login
  await page.waitForTimeout(2000);

  // Navigate to the Tasks module
  await framePage.navigateToTasks();

  // Verify the Inbox header is shown (Tasks module loaded)
  await framePage.verifyInboxHeader();

  // Wait briefly
  await page.waitForTimeout(2000);

  // Hover then click the "Tasks" command-bar selector
  const tasksSelector = page.locator("//div[@id='command-bar-select-resource']/descendant::span[contains(text(), 'Tasks')]");
  await tasksSelector.hover({ timeout: 60000 });
  await tasksSelector.click({ timeout: 60000 });

  // Wait briefly
  await page.waitForTimeout(2000);
});
