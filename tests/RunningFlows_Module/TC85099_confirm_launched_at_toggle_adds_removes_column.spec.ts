import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85099 - Confirm selecting/deselecting launched at toggle adds/removes launched at column
 * Original: muuk-tests/RunningFlows_Module/TestSteps_38435b4b.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85099 - Confirm selecting/deselecting launched at toggle adds/removes launched at column in table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click Launched at column menu and hide it
  await runningFlowsPage.clickColumnHeader('Launched at');
  await runningFlowsPage.clickColumnMenuButton('Launched at');
  await runningFlowsPage.clickHideColumn();

  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Reset
  await runningFlowsPage.clickHiddenColumnsButton();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');
  await runningFlowsPage.assertColumnToggleVisible('Launched at');
});
