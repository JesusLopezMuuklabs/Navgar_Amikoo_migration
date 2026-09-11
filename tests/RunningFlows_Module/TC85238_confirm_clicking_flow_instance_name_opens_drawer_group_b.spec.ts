import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85238 - Confirm clicking on the flow instance name will open the corresponding drawer
 * Original: muuk-tests/RunningFlows_Module/TestSteps_518ff8aa.spec.ts
 * Note: Similar to TC85113 but for a different running flow group context.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85238 - Confirm clicking on the flow instance name will open the corresponding drawer (group B)', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click TestRunningFlowTemplate link
  await runningFlowsPage.clickTestRunningFlowTemplateLink();

  // Assert instance detail is visible (_Running Flow Template breadcrumb)
  await runningFlowsPage.assertRunningFlowTemplateSpanVisible();
});
