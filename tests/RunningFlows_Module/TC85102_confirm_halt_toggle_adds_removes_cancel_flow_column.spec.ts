import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85102 - Confirm selecting/deselecting halt toggle adds/removes cancel flow column in table view
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3843659c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85102 - Confirm selecting/deselecting halt toggle adds/removes cancel flow column in table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Scroll right to reach the Halt column
  await runningFlowsPage.scrollGridHorizontally(500);

  // Hover the active column header (open state)
  await runningFlowsPage.hoverActiveColumnHeader();
  await runningFlowsPage.clickHaltColumnMenu();
  await runningFlowsPage.clickHideColumn();

  // Assert column is now hidden (halt column no longer visible)
  await runningFlowsPage.assertActiveColumnHeaderNotVisible();

  // Reopen with "1 Hidden columns" and reset
  await runningFlowsPage.clickHiddenColumnsButton();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');

  // Assert column is back (not visible in hidden state)
  await runningFlowsPage.assertActiveColumnHeaderNotVisible();
});
