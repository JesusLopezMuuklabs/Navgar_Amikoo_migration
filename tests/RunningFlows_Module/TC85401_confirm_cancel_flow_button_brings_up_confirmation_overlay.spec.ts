import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85401 - Confirm Cancel flow button brings up confirmation overlay
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba24b6e9.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85401 - Confirm Cancel flow button brings up confirmation overlay', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Navigate to the flow instance
  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();

  // Click Cancel flow button
  await runningFlowsPage.clickCancelFlow();

  // Assert confirmation overlay visible
  await runningFlowsPage.assertCancelConfirmationVisible();
});
