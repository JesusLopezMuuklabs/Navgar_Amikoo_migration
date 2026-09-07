import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77378 - Email Template Confirm delete button opens confirmation prompt
 * Original: muuk-tests/Flows_Module/TestSteps_684987eb.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77378 - Email Template: delete button opens confirmation prompt', async ({ page }) => {
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

  // Hover and click delete
  await page.locator(`//H6[normalize-space() = "Variables created"]/following::div[normalize-space() = "{{var1}}"][1]`).hover({ timeout: 60000 });
  await page.locator(`//div[@aria-label="Delete variable"]`).click({ timeout: 60000 });

  // Assert confirmation dialog appears
  await expect(page.locator(`//H6[contains(text(),"Delete variable")]`)).toBeVisible({ timeout: 60000 });

  // Cancel
  await page.keyboard.press('Escape');
});
