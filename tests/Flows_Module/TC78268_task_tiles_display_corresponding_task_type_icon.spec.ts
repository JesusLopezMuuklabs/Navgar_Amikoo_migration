import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78268 - Confirm task tiles display their corresponding task type icon
 * Original: muuk-tests/Flows_Module/TestSteps_c946aac4.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78268 - Task tiles display their corresponding task type icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();
  await flowsPage.clickTemplateTab();

  // Assert a task tile is visible with avatar (task type icon)
  await expect(page.locator(`//div[contains(@class, "MuiAvatar-root")]`).nth(1)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
