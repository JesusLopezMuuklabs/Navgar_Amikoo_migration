import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';

/*
 * TC85242 - Confirm clicking on flow template name will link to the corresponding flow template
 * Original: muuk-tests/RunningFlows_Module/TestSteps_518ff9cf.spec.ts
 * Note: Similar to TC85116 but in a different running flow group context.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85242 - Confirm clicking on flow template name will link to the corresponding flow template (group B)', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Assert Flow template name column visible
  await runningFlowsPage.assertFlowTemplateNameColumnVisible();

  // Click the _Running Flow Template link
  await runningFlowsPage.clickRunningFlowTemplateLink();

  // Assert template span visible
  await runningFlowsPage.assertRunningFlowTemplateSpanVisible();
});
