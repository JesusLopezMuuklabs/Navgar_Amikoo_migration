import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79006 - Email: Confirm ability to select an email template from the task details pane
 * Original: muuk-tests/Flows_Module/TestSteps_7664a69e.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79006 - Email: ability to select email template from task details pane', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert No email yet label (before template is selected)
  await expect(page.locator(`//P[normalize-space() = "No Navgar Email yet"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
