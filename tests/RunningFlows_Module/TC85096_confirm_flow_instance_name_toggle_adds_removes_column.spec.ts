import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85096 - Confirm selecting/deselecting flow instance name toggle adds/removes flow instance name column
 * Original: muuk-tests/RunningFlows_Module/TestSteps_384186a2.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85096 - Confirm selecting/deselecting flow instance name toggle adds/removes flow instance name column in table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click Flow Instance Name column header and hide it
  await runningFlowsPage.clickColumnHeader('Flow Instance Name');
  await runningFlowsPage.clickColumnMenuButton('Flow Instance Name');
  await runningFlowsPage.clickHideColumn();

  // Assert 1 Hidden columns button visible
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Reset columns
  await runningFlowsPage.clickHiddenColumnsButton();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');

  // Assert column is visible again
  await runningFlowsPage.assertFlowInstanceNameColumnVisible();
});
