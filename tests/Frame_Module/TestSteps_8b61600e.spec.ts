/**
 * Test Case ID: TC64576
 * Description: Clicking on a result will take you to the corresponding location
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b61600e.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64576 – Clicking a search result navigates to the corresponding page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type the task name
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test Task');

  // Hover then click the first "Test Task" result
  await expect(page.locator("//SPAN[normalize-space() = 'Test Task']")).toBeVisible({ timeout: 30000 });
  await page.locator("//SPAN[normalize-space() = 'Test Task']").click({ timeout: 60000 });

  // Verify the URL now contains the tasks path
  const expectedPattern = '/104/tasks/';
  await page.waitForURL(new RegExp(expectedPattern), { timeout: 5000 });
  await expect(page).toHaveURL(new RegExp(expectedPattern));
});
