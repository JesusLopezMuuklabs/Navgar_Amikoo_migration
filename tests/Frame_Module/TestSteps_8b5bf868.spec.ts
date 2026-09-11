/**
 * Test Case ID: TC64564
 * Description: Using the alt+k hotkey opens the search input field
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b5bf868.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64564 – Alt+K hotkey opens the search input field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test');

  // Verify the search results section "TasksShow all" becomes visible,
  // which confirms the search field opened and query ran
  await expect(
    page.locator("//DIV[normalize-space() = 'TasksShow all']")
  ).toBeVisible({ timeout: 30000 });
});
