import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85241 - Confirm status column displays current flow instance status (Running, Task delay, Flow delay)
 * Original: muuk-tests/RunningFlows_Module/TestSteps_518ff973.spec.ts
 * Note: Similar to TC85112 but in a different running flow group context.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85241 - Confirm status column displays current flow instance status (group B)', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Assert Status column header and Running Flows header visible
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
  await runningFlowsPage.assertRunningStatusVisible();
});
