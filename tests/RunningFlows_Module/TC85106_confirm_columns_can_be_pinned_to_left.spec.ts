import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85106 - Confirm columns can be pinned to the left
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3845907e.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85106 - Confirm columns can be pinned to the left', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open Progress column menu and pin to right (then verify)
  await runningFlowsPage.clickColumnHeader('Progress');
  await runningFlowsPage.clickColumnMenuButton('Progress');

  // Click "Pin to" menuitem and select "Pin to right"
  await runningFlowsPage.clickPinToMenuItem();
});
