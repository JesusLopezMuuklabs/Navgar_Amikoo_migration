import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77361 - Email Template Confirm edit button opens the edit variable field
 * Original: muuk-tests/Flows_Module/TestSteps_682b4cbd.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77361 - Email Template: edit button opens the edit variable field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Create variable
  await page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).first().click({ timeout: 60000 });
  await page.locator(`//INPUT[@placeholder='Add variable name'][@type='text']`).fill('var1', { timeout: 60000 });
  await page.locator(`//DIV[normalize-space() = 'New variable "var1"']`).click({ timeout: 60000 });

  // Hover over variable in pane, then click edit
  await page.locator(`//H6[normalize-space() = "Variables created"]/following::div[normalize-space() = "{{var1}}"][1]`).hover({ timeout: 60000 });
  await page.locator(`//div[@aria-label="Edit variable"]`).click({ timeout: 60000 });

  // Assert edit input field opens
  await expect(page.locator(`//DIV//INPUT[@name="content"]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
