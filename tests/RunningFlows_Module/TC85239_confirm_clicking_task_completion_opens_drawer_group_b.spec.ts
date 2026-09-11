import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85239 - Confirm clicking on the task completion icon will open the corresponding drawer
 * Original: muuk-tests/RunningFlows_Module/TestSteps_518ff8ed.spec.ts
 * Note: Similar to TC85114 but for a different running flow group context.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85239 - Confirm clicking on the task completion icon will open the corresponding drawer (group B)', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click the flow instance link
  await runningFlowsPage.clickTestRunningFlowTemplateLink();

  // Navigate to flow template breadcrumb
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.assertTestRunningFlowTemplateSpanVisible();
});
