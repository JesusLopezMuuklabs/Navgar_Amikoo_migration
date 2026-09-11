/**
 * Test Case ID: TC64571
 * Description: List will display up to three results from each category
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b5e9116.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64571 – Search list displays up to three results per category', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test');

  // Verify multiple group results from the same category are shown (up to 3)
  await expect(page.locator("//SPAN[normalize-space() = 'Test Group']")).toBeVisible({ timeout: 30000 });
  await expect(page.locator("//SPAN[normalize-space() = 'Group Test']").nth(0)).toBeVisible({ timeout: 30000 });
  await expect(page.locator("//SPAN[normalize-space() = 'Group Test']").nth(1)).toBeVisible({ timeout: 30000 });

  // Click each visible result
  await page.locator("//SPAN[normalize-space() = 'Test Group']").click({ timeout: 60000 });
  await page.locator("//SPAN[normalize-space() = 'Group Test']").nth(0).click({ timeout: 60000 });
  await page.locator("//SPAN[normalize-space() = 'Group Test']").nth(1).click({ timeout: 60000 });

  // Wait briefly (preserves original sleep intent)
  await page.waitForTimeout(2000);
});
