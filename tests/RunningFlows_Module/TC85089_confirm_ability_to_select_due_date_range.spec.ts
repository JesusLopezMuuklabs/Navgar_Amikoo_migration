import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85089 - Confirm ability to select a due date range
 * Original: muuk-tests/RunningFlows_Module/TestSteps_384155bb.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC85089 - Confirm ability to select a due date range', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open the due date filter
  await runningFlowsPage.clickDueDateButton();

  // Interact with month calendar pickers
  await runningFlowsPage.clickFirstMonthCalendar();
  await runningFlowsPage.clickSecondMonthCalendar();
});
