import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85398 - Confirm flow template name is clickable
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba24b58a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85398 - Confirm flow template name is clickable', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Navigate into the flow instance
  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  // Click on the TestRunningFlowTemplate span (flow template link)
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  // Assert the template link visible (flow template page)
  await runningFlowsPage.assertTestRunningFlowTemplateLinkVisible();
});
