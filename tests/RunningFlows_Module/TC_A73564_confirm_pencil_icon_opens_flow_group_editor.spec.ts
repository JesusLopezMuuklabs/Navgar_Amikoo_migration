import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC_A73564 - Confirm pencil icon opens flow group editor
 * Original: muuk-tests/RunningFlows_Module/TestSteps_b1fd2526.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A73564 - Confirm pencil icon opens flow group editor', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click the _Running Flow Group in the sidebar
  await runningFlowsPage.clickRunningFlowGroup('_Running Flow Group');

  // Click the edit button (pencil icon) for _Running Flow Group
  await runningFlowsPage.clickRunningFlowGroupEditButton('_Running Flow Group');

  // Assert "Edit group" header visible
  await expect(page.locator(`//H6[normalize-space() = 'Edit group']`)).toBeVisible({ timeout: 60000 });
});
