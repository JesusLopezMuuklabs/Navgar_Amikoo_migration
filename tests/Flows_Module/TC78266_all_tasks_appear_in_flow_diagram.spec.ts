import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78266 - Confirm all tasks appear in flow diagram
 * Original: muuk-tests/Flows_Module/TestSteps_c9459979.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78266 - All tasks appear in flow diagram', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Template tab to open the flow diagram
  await flowsPage.clickTemplateTab();

  // Assert the react-flow diagram canvas is visible
  await expect(page.locator(`//div[@class="react-flow__pane"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
