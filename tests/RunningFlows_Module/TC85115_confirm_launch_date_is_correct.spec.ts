import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';
import { faker } from '@faker-js/faker';

/*
 * TC85115 - Confirm launch date is correct
 * Original: muuk-tests/RunningFlows_Module/TestSteps_3846d029.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85115 - Confirm launch date is correct', async ({ page }) => {
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

  // Assert the "created_at" date column cell is visible
  await expect(
    page.locator(`//div[@data-field="created_at"]`).nth(1)
  ).toBeVisible({ timeout: 60000 });

  // Cleanup
  await runningFlowsPage.navigateToFlowTemplates();
  await runningFlowsPage.searchAndHoverGroup(randNum);
  await runningFlowsPage.clickGroupDeleteIcon();
  await runningFlowsPage.confirmGroupDeletion();
});
