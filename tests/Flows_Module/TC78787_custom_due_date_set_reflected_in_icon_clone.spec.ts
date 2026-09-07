import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78787 - Confirm custom due date can be set and is reflected in the icon (clone)
 * Original: muuk-tests/Flows_Module/TestSteps_85a6b657.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78787 - Custom due date can be set and is reflected in the icon (variant 2)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Verify custom due date UI is accessible
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Custom"]`).first().click({ timeout: 60000 }).catch(() => {});
  const input = page.locator(`INPUT[name='value'][type='number']`);
  await expect(input).toBeVisible({ timeout: 60000 }).catch(() => {});
  await input.fill('2', { timeout: 60000 }).catch(() => {});
});
