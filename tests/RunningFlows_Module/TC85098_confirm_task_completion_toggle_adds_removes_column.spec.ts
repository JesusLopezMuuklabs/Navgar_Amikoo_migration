import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85098 - Confirm selecting/deselecting task completion toggle adds/removes task completion column
 * Original: muuk-tests/RunningFlows_Module/TestSteps_38419257.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85098 - Confirm selecting/deselecting task completion toggle adds/removes task completion column in table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click Task completion column menu and hide it
  await runningFlowsPage.clickColumnHeader('Task completion');
  await runningFlowsPage.clickColumnMenuButton('Task completion');
  await runningFlowsPage.clickHideColumn();

  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Reset
  await runningFlowsPage.clickHiddenColumnsButton();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');
  await runningFlowsPage.assertColumnToggleVisible('Task completion');
});
