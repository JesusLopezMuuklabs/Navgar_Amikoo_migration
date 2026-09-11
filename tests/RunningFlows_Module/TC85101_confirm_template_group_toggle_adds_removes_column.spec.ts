import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85101 - Confirm selecting/deselecting template group toggle adds/removes template group column
 * Original: muuk-tests/RunningFlows_Module/TestSteps_384361d2.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85101 - Confirm selecting/deselecting template group toggle adds/removes template group column in table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click Template group column and hide it
  await runningFlowsPage.clickColumnHeader('Template group');
  await runningFlowsPage.clickColumnMenuButton('Template group');
  await runningFlowsPage.clickHideColumn();

  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Reset
  await runningFlowsPage.clickHiddenColumnsButton();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');
  await runningFlowsPage.assertColumnToggleVisible('Template group');
});
