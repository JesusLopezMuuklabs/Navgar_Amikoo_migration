import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85103 - Confirm show/hide all toggle selects/deselects all toggles
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3843678c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85103 - Confirm show/hide all toggle selects/deselects all toggles', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open columns panel
  await runningFlowsPage.clickColumnsButton();
  await runningFlowsPage.assertColumnManagementPanelVisible();

  // Click Show/Hide All to hide all columns
  await runningFlowsPage.clickShowHideAll();

  // Assert "11 Hidden columns" button appears
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "11 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Click Show/Hide All again to show all
  await runningFlowsPage.clickShowHideAll();

  // All column toggles visible
  await runningFlowsPage.assertColumnToggleVisible('Progress');
  await runningFlowsPage.assertColumnToggleVisible('Status');

  // Reset
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');
});
