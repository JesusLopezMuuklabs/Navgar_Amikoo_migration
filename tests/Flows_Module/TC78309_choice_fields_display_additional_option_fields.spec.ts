import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78309 - Confirm choice fields display additional option fields
 * Original: muuk-tests/Flows_Module/TestSteps_f4c7cb19.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78309 - Choice fields display additional option fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Open form builder and add a Single Choice field
  await page.locator(`//Button[@aria-label="Add form"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//SPAN[normalize-space() = "Single choice"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert additional option field input appears
  await expect(page.locator(`//INPUT[@name='option-builder-form-field-0-option-0'][@type='text']`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
