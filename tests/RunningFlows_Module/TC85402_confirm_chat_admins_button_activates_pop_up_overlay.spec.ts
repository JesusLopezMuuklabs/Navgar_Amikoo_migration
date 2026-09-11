import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85402 - Confirm chat admins button activates pop up overlay
 * Original: muuk-tests/RunningFlows_Module/TestSteps_ba24b75e.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85402 - Confirm chat admins button activates pop up overlay', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Navigate to the flow instance
  await runningFlowsPage.clickTestRunningFlowTemplateLink();
  await runningFlowsPage.clickRunningFlowTemplateBreadcrumb();
  await runningFlowsPage.clickTestRunningFlowTemplateSpan();

  // Click Chat tab
  await runningFlowsPage.clickChatTab();

  // Click the options button (three dots menu)
  await runningFlowsPage.clickChatOptionsButton();

  // Click "Manage participants"
  await runningFlowsPage.clickManageParticipants();

  // Assert Task participants overlay visible
  await runningFlowsPage.assertTaskParticipantsVisible();
});
