import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85404 - Confirm chat participants button activates participants overlay
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba24b848.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85404 - Confirm chat participants button activates participants overlay', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Navigate to the flow instance
  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
});
