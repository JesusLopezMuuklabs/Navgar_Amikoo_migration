import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85243 - Confirm alert counter appears on top right of module button when flow instance alerts present
 * Original: muuk-tests/RunningFlows_Module/TestSteps_518ffaef.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85243 - Confirm alert counter appears on top right of module button when flow instance alerts present', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Assert the flow alerts button is present
  await runningFlowsPage.clickFlowAlertsButton();
  await runningFlowsPage.assertFlowAlertsPanelVisible();
});
