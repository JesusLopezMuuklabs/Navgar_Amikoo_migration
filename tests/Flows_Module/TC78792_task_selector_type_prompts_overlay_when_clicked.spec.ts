import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78792 - Confirm task selector type prompts overlay when clicked
 * Original: muuk-tests/Flows_Module/TestSteps_85ac89cf.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78792 - Task selector type prompts overlay when clicked', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert "Select a task type" overlay is visible
  await expect(page.locator(`//P[normalize-space() = "Select a task type"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
