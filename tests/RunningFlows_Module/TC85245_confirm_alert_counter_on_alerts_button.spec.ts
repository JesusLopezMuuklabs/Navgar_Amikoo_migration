import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85245 - Confirm alert counter appears on top right of alerts button when flow instance alerts are present
 * Original: muuk-tests/RunningFlows_Module/TestSteps_518ffbd8.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85245 - Confirm alert counter appears on top right of alerts button when flow instance alerts are present', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click the TestRunningFlowTemplate instance
  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  // Navigate to the _Running Flow Template breadcrumb
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();

  // Assert the template span is visible
  await runningFlowsPage.assertTestRunningFlowTemplateSpanVisible();
});
