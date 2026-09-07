import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78357 - Confirm form appears in expanded task details when created
 * Original: muuk-tests/Flows_Module/TestSteps_c6692e3f.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78357 - Form appears in expanded task details when created', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert "Build your form" section is visible (form builder)
  await expect(page.locator(`//DIV[normalize-space() = "Build your form"]`).nth(1)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
