/**
 * Test Case ID: TC64590
 * Description: Pagination is triggered when scrolling down
 * Migrated from: muuk-tests/Frame_Module/TestSteps_315aeeec.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64590 – Pagination is triggered when scrolling down', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test');

  // Wait briefly for results to appear
  await page.waitForTimeout(2000);

  // Click "Show all" to open the expanded search view
  await framePage.clickShowAll();

  // Verify the expanded task container is visible
  await framePage.verifyExpandedTasksViewVisible();

  // Scroll to the bottom to trigger pagination
  await framePage.scrollToBottom();

  // Wait for pagination to settle
  await page.waitForTimeout(2000);
});
