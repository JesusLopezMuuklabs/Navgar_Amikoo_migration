import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85400 - Confirm percentage circle icon updates when tasks are completed
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba24b674.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85400 - Confirm percentage circle icon updates when tasks are completed', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Navigate to the flow instance
  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();

  // Assert progress is initially 0%
  await runningFlowsPage.assertProgressZeroPercent();

  // Click Tasks tab and assert First Task is visible
  await runningFlowsPage.clickTasksTab();
  await runningFlowsPage.assertFirstTaskVisible();
});
