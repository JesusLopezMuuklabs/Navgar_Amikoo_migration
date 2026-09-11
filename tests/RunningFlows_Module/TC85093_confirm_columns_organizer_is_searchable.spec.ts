import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85093 - Confirm columns organizer is searchable
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3841784e.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC85093 - Confirm columns organizer is searchable', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open columns organizer and search inside it
  await runningFlowsPage.clickColumnsButton();
  await runningFlowsPage.assertColumnManagementPanelVisible();

  // Assert search input works by filling a column name
  await runningFlowsPage.fillSearch('Progress');
  await runningFlowsPage.assertColumnToggleVisible('Progress');
});
