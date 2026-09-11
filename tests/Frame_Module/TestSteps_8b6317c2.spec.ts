/**
 * Test Case ID: TC64578
 * Description: The filter buttons will filter the search results
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b6317c2.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64578 – Filter buttons filter the expanded search results', async ({ page }) => {
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

  // Click "Show all" from the Groups section (index 1)
  await page.locator("//BUTTON[@type='button'][normalize-space() = 'Show all']").nth(1).click({ timeout: 60000 });

  // Apply "Project tasks" filter
  await framePage.clickProjectTasksFilter();

  // Verify task result shows under filtered view
  await expect(page.locator("//B[contains(text(),'Task')]")).toBeVisible({ timeout: 30000 });

  // Wait briefly
  await page.waitForTimeout(2000);
});
