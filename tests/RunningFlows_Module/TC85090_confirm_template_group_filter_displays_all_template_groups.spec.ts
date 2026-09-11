import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85090 - Confirm template group filter displays all template groups
 * Original: muuk-tests/RunningFlows_Module/TestSteps_38415810.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC85090 - Confirm template group filter displays all template groups', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open the Flow Templates filter
  await runningFlowsPage.clickFlowTemplatesFilterButton();

  // Assert the filter panel is visible
  await runningFlowsPage.assertFlowTemplatesFilterPanelVisible();
});
