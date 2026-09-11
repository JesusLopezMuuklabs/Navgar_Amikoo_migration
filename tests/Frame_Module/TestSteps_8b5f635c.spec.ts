/**
 * Test Case ID: TC64573
 * Description: Tasks and flow instances will show their currently completed status
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b5f635c.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64573 – Tasks show their currently completed status in search results', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test');

  // Hover the "Tasks" section header to confirm it's displayed
  await expect(page.locator("//P[contains(text(),'Tasks')]")).toBeVisible({ timeout: 30000 });

  // Wait briefly for results to fully render
  await page.waitForTimeout(2000);

  // Hover the first task result (Test Task) to verify its presence
  await expect(page.locator("//span[@class='highlight-result']").nth(0)).toBeVisible({ timeout: 30000 });

  // Hover the completion status ("Done" + 100%) to verify it is shown
  await expect(
    page.locator("//span[@class='highlight-result']/following::p[contains(text(), 'Done')]")
  ).toBeVisible({ timeout: 30000 });

  // Wait briefly (preserves original sleep intent)
  await page.waitForTimeout(2000);
});
