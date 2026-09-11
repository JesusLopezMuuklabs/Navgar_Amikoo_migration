import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85396 - Confirm flow group name is displayed
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba24b43e.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85396 - Confirm flow group name is displayed', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click the instance link
  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  // Navigate to _Running Flow Template breadcrumb
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  // Click the TestRunningFlowTemplate span (flow template name link)
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  // Assert the Tasks tab is visible (flow template group is shown)
  await runningFlowsPage.assertTestRunningFlowTemplateSpanVisible();
});
