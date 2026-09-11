/**
 * Test Case ID: TC64569
 * Description: Clear button clears any search text
 * Migrated from: muuk-tests/Frame_Module/TestSteps_8b5e0af3.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64569 – Clear button clears any search text', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test');

  // Hover a visible result to confirm search ran
  await expect(page.locator("//SPAN[normalize-space() = 'Test Group']")).toBeVisible({ timeout: 30000 });

  // Click the Clear button
  await page.locator("//BUTTON[@type='button'][normalize-space() = 'Clear']").first().click({ timeout: 60000 });

  // Verify the search results container is no longer visible
  await expect(page.locator("//div[@class='flex flex-col h-full gap-4']")).not.toBeVisible({ timeout: 30000 });
});
