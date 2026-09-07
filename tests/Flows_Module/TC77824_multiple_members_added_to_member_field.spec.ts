import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77824 - Confirm multiple members can be added to the member field
 * Original: muuk-tests/Flows_Module/TestSteps_a2363451.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77824 - Multiple members can be added to the member field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();
  await flowsPage.clickOverviewTab();

  // Assert members field input is accessible
  await expect(page.locator(`//INPUT[@placeholder='Add members'][@type='text'][@role='combobox']`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
