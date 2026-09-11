import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';
import { faker } from '@faker-js/faker';

/*
 * TC_A74252 - Delete Flow Group Confirm confirmation overlay appears
 * Original: muuk-tests/RunningFlows_Module/TestSteps_12aee118.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A74252 - Delete Flow Group - Confirm confirmation overlay appears', async ({ page }) => {
  const runningFlowsPage = new RunningFlowsPage(page);
  const randNum = faker.string.numeric(4);

  await page.goto(BASE_URL, { timeout: 20000 });
  await runningFlowsPage.login(EMAIL, PASSWORD);
  await runningFlowsPage.navigateToFlowTemplates();

  // Create a new flow group
  await runningFlowsPage.clickNewFlowGroup();
  await runningFlowsPage.fillGroupName(`Test${randNum}`);
  await runningFlowsPage.clickSaveGroup();

  // Add Victor Villa as member
  await runningFlowsPage.hoverAngelRamirez();
  await runningFlowsPage.clickAddMembersInput();
  await runningFlowsPage.clickVictorVilla();
  await page.waitForLoadState('domcontentloaded');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(2000);
  await page.keyboard.press('Escape');

  // Search, hover, click delete icon
  await runningFlowsPage.searchAndHoverGroup(randNum);
  await runningFlowsPage.clickGroupDeleteIcon();

  // Assert "Yes, delete it" button is visible (confirmation overlay)
  await expect(
    page.locator(`//h6[normalize-space() = "Delete group"]/following::BUTTON[@type='button'][normalize-space() = "Yes, delete it"][1]`)
  ).toBeVisible({ timeout: 60000 });

  // Complete deletion
  await runningFlowsPage.confirmGroupDeletion();
});
