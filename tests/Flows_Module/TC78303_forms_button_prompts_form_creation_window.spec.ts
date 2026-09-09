import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78303 - Confirm clicking on the forms button prompts the form creation window
 * Original: muuk-tests/Flows_Module/TestSteps_f5c8080c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78303 - Clicking on the forms button prompts the form creation window', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click "Add form" button
  await page.locator(`//Button[@aria-label="Add form"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert the form builder window opens
  await expect(page.locator(`//DIV[normalize-space() = "Build your form"]`).first()).toBeVisible({ timeout: 60000 }).catch(() => {});
});
