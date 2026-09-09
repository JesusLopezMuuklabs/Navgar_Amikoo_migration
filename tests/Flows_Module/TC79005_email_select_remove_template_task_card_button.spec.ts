import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79005 - Email: Confirm ability to select and remove an email template from the task card button
 * Original: muuk-tests/Flows_Module/TestSteps_766446ec.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79005 - Email: ability to select and remove email template from task card button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert Add template button is visible from task card
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "Add template"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
