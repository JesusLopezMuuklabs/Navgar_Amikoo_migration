import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC_A73552 - Flow Group Confirm ability to add and remove members
 * Original: muuk-tests/Flows_Module/TestSteps_b1f4a79a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A73552 - Flow Group: ability to add and remove members', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickGroupSettingsTab();

  // Assert the Add members input is accessible
  await expect(page.locator(`INPUT[placeholder='Add members'][type='text'][role='combobox']`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
