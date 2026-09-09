import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC_A73232 - Flow Module Create Private group
 * Original: muuk-tests/Flows_Module/TestSteps_fd08fd71.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A73232 - Flow Module: Create Private group', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();

  // Click + New Flow Group
  await flowsPage.clickNewFlowGroup();

  // Fill the group name
  const randNum = Math.floor(Math.random() * 9999);
  await flowsPage.fillGroupName(`Test${randNum}`);
  await flowsPage.saveGroupName();

  // Dismiss the command bar
  await page.keyboard.press('Escape');

  // Search for the created group
  await flowsPage.searchTemplate(`Test${randNum}`);
  await page.waitForTimeout(300);

  // Hover and delete the group to clean up
  const groupRow = page.locator(`(//div[@class="flex w-full overflow-hidden gap-2"])[4]`);
  await groupRow.hover({ timeout: 60000 });
  await flowsPage.clickGroupDeleteIcon();
  await flowsPage.confirmGroupDeletion();
});
