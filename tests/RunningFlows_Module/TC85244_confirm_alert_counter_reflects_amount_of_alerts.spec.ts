import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85244 - Confirm alert counter number reflects current amount of alerts
 * Original: muuk-tests/RunningFlows_Module/TestSteps_518ffb93.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85244 - Confirm alert counter number reflects current amount of alerts', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open flow alerts and assert 1-1 of 1 pagination
  await runningFlowsPage.clickFlowAlertsButton();
  await runningFlowsPage.assertFlowAlertsPanelVisible();
  await runningFlowsPage.assertPaginationOneOfOne();
});
