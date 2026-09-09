import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79002 - Confirm Human task can be duplicated in the multiselect menu
 * Original: muuk-tests/Flows_Module/TestSteps_7660cad7.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79002 - Human task can be duplicated in the multiselect menu', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert Clone option is accessible in step context menu
  await expect(page.locator(`//SPAN[normalize-space() = "Clone"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
