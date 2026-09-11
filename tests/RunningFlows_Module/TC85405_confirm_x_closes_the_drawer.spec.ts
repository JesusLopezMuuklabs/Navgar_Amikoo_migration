import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85405 - Confirm X closes the drawer
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba24b8bd.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85405 - Confirm X closes the drawer', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Navigate to the flow instance
  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();

  // Click Variables tab and assert visible
  await runningFlowsPage.clickVariablesTab();
  await runningFlowsPage.assertFlowInstanceNameVariableVisible();

  // Click X (close panel) button
  await runningFlowsPage.clickClosePanelButton();

  // Assert the close icon panel button area is no longer showing Variables panel
  await expect(
    page.locator(`//SPAN[normalize-space() = "Flow Instance Name *"]`)
  ).not.toBeVisible({ timeout: 60000 });
});
