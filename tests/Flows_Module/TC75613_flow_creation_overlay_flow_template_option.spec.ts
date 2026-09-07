import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC75613 - Confirm the flow creation overlay appears when selecting the flow template option from the new button
 * Original: muuk-tests/Flows_Module/TestSteps_df2e59e8.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';
const RAND_NAME = 'Test';

test('TC75613 - Flow creation overlay appears when selecting Flow Template from New button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();

  // Click New → Flow Template
  await flowsPage.clickNew();
  await flowsPage.selectFlowTemplate();

  // Fill the template name and submit
  const randNum = Math.floor(Math.random() * 9999);
  await flowsPage.fillFlowTemplateName(`${RAND_NAME}${randNum}`);
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

  // Assert the flow editor opens (tags container visible)
  await expect(page.locator(`//div[@class="flex w-full flex-wrap gap-2"]`)).toBeVisible({ timeout: 60000 });

  // Cleanup: close / escape
  await page.keyboard.press('Escape');
});
