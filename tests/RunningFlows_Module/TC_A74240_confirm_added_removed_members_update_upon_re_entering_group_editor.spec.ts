import { test, expect } from '@playwright/test';
import { RunningFlowsPage } from '../../pages/RunningFlows_Module/RunningFlowsPage';
import { faker } from '@faker-js/faker';

/*
 * TC_A74240 - Confirm added/removed members update upon re-entering group editor
 * Original: muuk-tests/RunningFlows_Module/TestSteps_12a414bf.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A74240 - Confirm added/removed members update upon re-entering group editor', async ({ page }) => {
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

  // Change Victor Villa's role to Editor
  await runningFlowsPage.clickLauncherButton();
  await runningFlowsPage.clickMakeGroupEditor();
  await runningFlowsPage.hoverEditorBadge();

  await page.keyboard.press('Escape');
  await page.waitForTimeout(2000);

  // Search and hover the group, re-open editor and verify
  await runningFlowsPage.searchAndHoverGroup(randNum);
  await runningFlowsPage.clickGroupHoverEditButton();
  await runningFlowsPage.hoverEditorButtonOnReopen();

  await page.keyboard.press('Escape');
  await page.waitForTimeout(2000);

  // Search and hover, delete
  await runningFlowsPage.searchAndHoverGroup(randNum);
  await runningFlowsPage.clickGroupDeleteIcon();
  await runningFlowsPage.confirmGroupDeletion();
});
