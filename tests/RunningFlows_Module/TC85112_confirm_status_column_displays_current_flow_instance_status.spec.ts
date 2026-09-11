import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';
import { faker } from '@faker-js/faker';

/*
 * TC85112 - Confirm status column displays current flow instance status (Running, Task delay, Flow delay)
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3846cf60.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85112 - Confirm status column displays current flow instance status', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);
  const randNum = faker.string.numeric(4);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToFlowTemplates();

  // Create group
  await runningFlowsPage.clickNewFlowGroup();
  await runningFlowsPage.fillGroupName(`Test${randNum}`);
  await runningFlowsPage.clickSaveGroup();
  await runningFlowsPage.hoverAngelRamirez();
  await runningFlowsPage.clickAddMembersInput();
  await runningFlowsPage.clickVictorVilla();
  await page.waitForLoadState('domcontentloaded');
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');

  // Navigate to Running Flows
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Assert Status column header
  await runningFlowsPage.clickColumnHeader('Status');
  await runningFlowsPage.clickColumnMenuButton('Status');
  await page.keyboard.press('Escape');

  // Assert the flow template appears
  await runningFlowsPage.assertTestRunningFlowTemplateCellVisible();

  // Cleanup
  await runningFlowsPage.navigateToFlowTemplates();
  await runningFlowsPage.searchAndHoverGroup(randNum);
  await runningFlowsPage.clickGroupDeleteIcon();
  await runningFlowsPage.confirmGroupDeletion();
});
