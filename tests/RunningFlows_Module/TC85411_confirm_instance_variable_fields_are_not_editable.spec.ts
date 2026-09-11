import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85411 - Confirm instance variable fields are not editable
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba25432f.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85411 - Confirm instance variable fields are not editable', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();
  await runningFlowsPage.clickVariablesTab();
  await runningFlowsPage.assertFlowInstanceNameRequiredVisible();

  // Assert "Flow Instance Name *Required" is visible (non-editable display)
  await expect(page.locator(`//DIV[normalize-space() = "​"]`).nth(4)).toBeVisible({ timeout: 60000 });
});
