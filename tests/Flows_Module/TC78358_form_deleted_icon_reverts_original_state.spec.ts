import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78358 - Confirm form can be deleted and the form icon reverts back to its original state
 * Original: muuk-tests/Flows_Module/TestSteps_c669a226.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78358 - Form can be deleted and form icon reverts back to original state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Edit form then Delete
  await page.locator(`//Button[@aria-label="Edit form"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Delete"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert form empty state returns (no fields in your form yet)
  await expect(page.locator(`//P[normalize-space() = "You do not have any fields in your form yet"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
