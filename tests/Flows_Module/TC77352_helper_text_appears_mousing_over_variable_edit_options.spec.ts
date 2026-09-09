import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77352 - Email Template Confirm helper text appears when mousing over variable edit options
 * Original: muuk-tests/Flows_Module/TestSteps_68238b24.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77352 - Email Template: helper text appears when mousing over variable edit options', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Create a variable
  await page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).first().click({ timeout: 60000 });
  await page.locator(`//INPUT[@placeholder='Add variable name'][@type='text']`).fill('var1', { timeout: 60000 });
  await page.locator(`//DIV[normalize-space() = 'New variable "var1"']`).click({ timeout: 60000 });

  // Hover over variable in side pane
  await page.locator(`//H6[normalize-space() = "Variables created"]/following::div[normalize-space() = "{{var1}}"][1]`).hover({ timeout: 60000 });

  // Hover over the Add variable icon
  await page.locator(`//div[@aria-label="Add this variable to the focused field"]`).hover({ timeout: 60000 });

  // Assert tooltip appears
  await expect(page.locator(`//div[@role="tooltip"][normalize-space() = "Add this variable to the focused field"]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
