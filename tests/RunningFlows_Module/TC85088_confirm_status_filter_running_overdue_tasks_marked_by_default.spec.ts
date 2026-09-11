import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85088 - Confirm the status filter has running and overdue tasks are marked by default
 * Original: muuk-tests/RunningFlows_Module/TestSteps_38413751.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC85088 - Confirm the status filter has running and overdue tasks are marked by default', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  // Navigate to Running Flows
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Assert "Running" status chip visible (default filter)
  await runningFlowsPage.assertRunningStatusVisible();

  // Assert "Running+1" overdue chip visible (default filter)
  await runningFlowsPage.assertOverdueFilterVisible();
});
