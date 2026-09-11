import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85097 - Confirm selecting/deselecting current owners toggle adds/removes current owners column
 * Original: muuk-tests/RunningFlows_Module/TestSteps_38418ec2.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85097 - Confirm selecting/deselecting current owners toggle adds/removes current owners column in table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click Current owners column header and hide it
  await runningFlowsPage.clickColumnHeader('Current owners');
  await runningFlowsPage.clickColumnMenuButton('Current owners');
  await runningFlowsPage.clickHideColumn();

  // Assert 1 Hidden columns button appears
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Reset
  await runningFlowsPage.clickHiddenColumnsButton();
  await runningFlowsPage.clickColumnsReset();
  await page.keyboard.press('Escape');
});
