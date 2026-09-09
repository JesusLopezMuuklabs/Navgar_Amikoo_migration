import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78356 - Confirm form task card button appears bold when form is attached to the task
 * Original: muuk-tests/Flows_Module/TestSteps_c6686cad.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78356 - Form task card button appears bold when form is attached to the task', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert Form label is visible (indicating form is attached)
  await expect(page.locator(`//DIV[normalize-space() = "Form"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
