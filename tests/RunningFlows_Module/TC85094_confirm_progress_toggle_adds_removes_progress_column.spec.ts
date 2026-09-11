import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85094 - Confirm selecting/deselecting progress toggle adds/removes progress column in table view
 * Original: muuk-tests/RunningFlows_Module/TestSteps_38417c81.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85094 - Confirm selecting/deselecting progress toggle adds/removes progress column in table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Open columns manager and toggle Progress column off
  await runningFlowsPage.clickColumnsButton();
  await runningFlowsPage.assertColumnManagementPanelVisible();
  await runningFlowsPage.assertColumnToggleVisible('Progress');

  await runningFlowsPage.clickColumnHeader('Progress');
  await runningFlowsPage.clickColumnMenuButton('Progress');
  await runningFlowsPage.clickHideColumn();

  // Assert "1 Hidden columns" button appears
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Reset columns
  await runningFlowsPage.clickHiddenColumnsButton();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');
});
