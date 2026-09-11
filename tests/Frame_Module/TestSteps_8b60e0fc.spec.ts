/**
 * Test Case ID: TC64575
 * Description: Clicking on the show all button will open the expanded search window
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b60e0fc.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64575 – Show all button opens the expanded search window', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test');

  // Wait briefly for results
  await page.waitForTimeout(2000);

  // Click "Show all" to open the expanded search view
  await framePage.clickShowAll();

  // Verify the expanded search container is visible
  await framePage.verifyExpandedTasksViewVisible();

  // Wait briefly (preserves original sleep intent)
  await page.waitForTimeout(2000);
});
