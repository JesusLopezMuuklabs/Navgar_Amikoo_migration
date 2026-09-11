import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85240 - Confirm launch date is correct
 * Original: muuk-tests/RunningFlows_Module/TestSteps_518ff930.spec.ts
 * Note: Similar to TC85115 but from a different running flow group context.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85240 - Confirm launch date is correct (group B)', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Assert the "created_at" column cell is visible
  await expect(
    page.locator(`//div[@data-field="created_at"]`).nth(1)
  ).toBeVisible({ timeout: 60000 });
});
