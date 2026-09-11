import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';
import { faker } from '@faker-js/faker';

/*
 * TC85108 - Confirm hide column button hides currently selected column from the table view
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3845972a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85108 - Confirm hide column button hides currently selected column from the table view', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);
  const randNum = faker.string.numeric(4);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToFlowTemplates();

  // Create a new flow group for test isolation
  await runningFlowsPage.clickNewFlowGroup();
  await runningFlowsPage.fillGroupName(`Test${randNum}`);
  await runningFlowsPage.clickSaveGroup();
  await runningFlowsPage.hoverAngelRamirez();
  await runningFlowsPage.clickAddMembersInput();
  await runningFlowsPage.clickVictorVilla();
  await page.waitForLoadState('domcontentloaded');
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(2000);

  // Search and hover the created group
  await runningFlowsPage.searchAndHoverGroup(randNum);

  // Navigate to Running Flows
  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Click "Flow Instance Name" column header and hide
  await runningFlowsPage.clickColumnHeader('Flow Instance Name');
  await runningFlowsPage.clickColumnMenuButton('Flow Instance Name');
  await runningFlowsPage.clickHideColumn();

  // Assert 1 Hidden columns button
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 Hidden columns"]`)).toBeVisible({ timeout: 60000 });

  // Cleanup: delete the group
  await runningFlowsPage.navigateToFlowTemplates();
  await runningFlowsPage.searchAndHoverGroup(randNum);
  await runningFlowsPage.clickGroupDeleteIcon();
  await runningFlowsPage.confirmGroupDeletion();
});
