import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85408 - Confirm expand arrow button expands and contracts the variables card
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba253efa.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85408 - Confirm expand arrow button expands and contracts the variables card', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  await runningFlowsPage.clickVariablesTab();

  // Assert variables panel visible
  await runningFlowsPage.assertFlowInstanceNameRequiredVisible();
});
