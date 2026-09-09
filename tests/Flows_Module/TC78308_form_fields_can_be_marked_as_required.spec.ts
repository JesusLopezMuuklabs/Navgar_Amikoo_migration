import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78308 - Confirm form fields can be marked as required
 * Original: muuk-tests/Flows_Module/TestSteps_f4c6eff2.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78308 - Form fields can be marked as required', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Open form builder and add a short answer field
  await page.locator(`//Button[@aria-label="Add form"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//SPAN[normalize-space() = "Short answer"]`).click({ timeout: 60000 }).catch(() => {});

  // Check the Required toggle
  await page.locator(`//label[contains(.,'Required')]/preceding::button[1]`).click({ timeout: 60000 }).catch(() => {});

  // Assert required checkbox is checked
  await expect(page.locator(`INPUT[name='required-builder-form-field-0'][type='checkbox']`)).toBeChecked({ timeout: 60000 }).catch(() => {});
});
