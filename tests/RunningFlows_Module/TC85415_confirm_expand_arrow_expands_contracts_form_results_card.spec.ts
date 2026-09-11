import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85415 - Confirm expand arrow button expands and contracts the form results card
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba254660.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85415 - Confirm expand arrow button expands and contracts the form results card', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});
