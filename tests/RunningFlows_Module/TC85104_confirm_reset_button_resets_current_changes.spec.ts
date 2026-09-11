import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85104 - Confirm reset button resets current changes
 * Original: muuk-tests/RunningFlows_Module/TestSteps_38437e9e.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85104 - Confirm reset button resets current changes', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open columns, hide all, then reset
  await runningFlowsPage.clickColumnsButton();
  await runningFlowsPage.clickShowHideAll();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');

  // Assert columns are visible after reset
  await runningFlowsPage.assertColumnToggleVisible('Progress');
});
