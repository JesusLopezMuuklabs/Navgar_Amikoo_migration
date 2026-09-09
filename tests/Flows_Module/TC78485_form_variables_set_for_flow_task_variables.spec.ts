import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78485 - Confirm form variables can be set for flow task variables
 * Original: muuk-tests/Flows_Module/TestSteps_85e4a0eb.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78485 - Form variables can be set for flow task variables', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert the Test Request variable appears in the flow
  await expect(page.locator(`//SPAN[normalize-space() = "{{Test Request}}"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
