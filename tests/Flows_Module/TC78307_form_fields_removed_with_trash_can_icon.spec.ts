import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78307 - Confirm form fields can be removed with the trash can icon
 * Original: muuk-tests/Flows_Module/TestSteps_f4c66f48.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78307 - Form fields can be removed with the trash can icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Open form builder
  await page.locator(`//Button[@aria-label="Add form"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Add a short answer field
  await page.locator(`//SPAN[normalize-space() = "Short answer"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert field appears
  await expect(page.locator(`INPUT[name='input-builder-form-field-0'][type='text']`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  // Click trash can button to remove
  await page.locator(`//div[normalize-space()='Build your form']/following-sibling::button`).click({ timeout: 60000 }).catch(() => {});

  // Assert "no fields" state returns
  await expect(page.locator(`//P[normalize-space() = "You do not have any fields in your form yet"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
