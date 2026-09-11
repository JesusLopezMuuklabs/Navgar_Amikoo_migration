import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85095 - Confirm selecting/deselecting status toggle adds/removes status column in table view
 * Original: muuk-tests/RunningFlows_Module/TestSteps_38417f72.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85095 - Confirm selecting/deselecting status toggle adds/removes status column in table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click Status column header and open menu
  await runningFlowsPage.clickColumnHeader('Status');
  await runningFlowsPage.clickColumnMenuButton('Status');
  await runningFlowsPage.clickHideColumn();

  // Assert column is hidden
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Reset
  await runningFlowsPage.clickHiddenColumnsButton();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');

  // Assert Status column visible again
  await runningFlowsPage.assertColumnToggleVisible('Status');
});
