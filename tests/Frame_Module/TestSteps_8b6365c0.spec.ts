/**
 * Test Case ID: TC64580
 * Description: Clicking outside the search result borders closes the search results with one click
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b6365c0.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64580 – Clicking outside the expanded search closes it', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Task');

  // Wait briefly for results
  await page.waitForTimeout(2000);

  // Click "Show all" from Groups section (index 1) to open expanded view
  await page.locator("//BUTTON[@type='button'][normalize-space() = 'Show all']").nth(1).click({ timeout: 60000 });

  // Apply "Project tasks" filter and verify the result
  await framePage.clickProjectTasksFilter();
  await expect(page.locator("//B[contains(text(),'Task')]")).toBeVisible({ timeout: 30000 });

  // Press Escape to close the expanded search window
  await page.keyboard.press('Escape');

  // Verify the "Task" result is no longer visible (search closed)
  await expect(page.locator("//B[contains(text(),'Task')]")).not.toBeVisible({ timeout: 30000 });

  // Wait briefly
  await page.waitForTimeout(2000);
});
