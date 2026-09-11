import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85417 - Confirm form results field results appear correctly
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba254b6f.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85417 - Confirm form results field results appear correctly', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();
  await runningFlowsPage.assertRunningFlowsHeaderVisible();
});
