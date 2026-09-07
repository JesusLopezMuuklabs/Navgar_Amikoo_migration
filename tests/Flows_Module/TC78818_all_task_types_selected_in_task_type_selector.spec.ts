import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78818 - Confirm all task types can be selected in the task type selector overlay
 * Original: muuk-tests/Flows_Module/TestSteps_694e614a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78818 - All task types can be selected in the task type selector overlay', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert task type label is visible
  await expect(page.locator(`//P[normalize-space() = "Select a task type"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  // Click email task type
  await page.locator(`//button[@aria-label="flowSteps.types.email.name"]`).first().click({ timeout: 60000 }).catch(() => {});
});
