import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85118 - Confirm flow instance can be canceled when clicking on the cancel flow button
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3846d468.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85118 - Confirm flow instance can be canceled when clicking on the cancel flow button', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click Running Flow Group in sidebar
  await runningFlowsPage.clickRunningFlowGroup('_Running Flow Group');

  // Click "Cancel flow" button
  await runningFlowsPage.clickCancelFlow();

  // Assert confirmation overlay
  await runningFlowsPage.assertCancelConfirmationVisible();
});
