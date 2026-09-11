import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85092 - Confirm flow templates filter displays all flow templates
 * Original: muuk-tests/RunningFlows_Module/TestSteps_384170d1.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC85092 - Confirm flow templates filter displays all flow templates', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open Flow Templates filter and assert panel
  await runningFlowsPage.clickFlowTemplatesFilterButton();
  await runningFlowsPage.assertFlowTemplatesFilterPanelVisible();
});
