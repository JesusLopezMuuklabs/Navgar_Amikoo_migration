/**
 * Test Case ID: TC64598
 * Description: Clicking outside the window borders closes the expanded search window with one click
 * Migrated from: muuk-tests/Frame_Module/TestSteps_1f42396e.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64598 – Clicking outside closes the expanded search window', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type a search term
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test');

  // The "Show all" button should now be visible (search results displayed)
  await framePage.verifyShowAllButtonVisible();

  // Click outside the search area (top-left corner of the viewport)
  await page.mouse.click(0, 0);

  // The search overlay should now be dismissed
  await framePage.verifyShowAllButtonNotVisible();
});
