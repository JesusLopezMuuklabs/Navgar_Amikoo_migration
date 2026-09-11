import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';
import { faker } from '@faker-js/faker';

/*
 * TC85117 - Confirm the template group is displayed within the template group column
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3846d423.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85117 - Confirm the template group is displayed within the template group column', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);
  const randNum = faker.string.numeric(4);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToFlowTemplates();

  await runningFlowsPage.clickNewFlowGroup();
  await runningFlowsPage.fillGroupName(`Test${randNum}`);
  await runningFlowsPage.clickSaveGroup();
  await runningFlowsPage.hoverAngelRamirez();
  await runningFlowsPage.clickAddMembersInput();
  await runningFlowsPage.clickVictorVilla();
  await page.waitForLoadState('domcontentloaded');
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');

  await runningFlowsPage.navigateToRunningFlows();
  await runningFlowsPage.hoverRunningFlowsHeader();

  // Assert Template group column header visible
  await expect(
    page.locator(`//DIV[@role='presentation'][normalize-space() = "Template group"]`).nth(1)
  ).toBeVisible({ timeout: 60000 });

  // Assert "_Running Flow Group" is visible in the Template group gridcell
  await runningFlowsPage.assertRunningFlowGroupTemplateGroupVisible();

  // Cleanup
  await runningFlowsPage.navigateToFlowTemplates();
  await runningFlowsPage.searchAndHoverGroup(randNum);
  await runningFlowsPage.clickGroupDeleteIcon();
  await runningFlowsPage.confirmGroupDeletion();
});
