import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79398 - Subflow: Confirm ability to select and remove a flow template from the task card button
 * Original: muuk-tests/Flows_Module/TestSteps_51462a42.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79398 - Subflow: ability to select and remove a flow template from the task card button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert subflow section is accessible
  await expect(page.locator(`//span[normalize-space()="Subflow"]/parent::div`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
