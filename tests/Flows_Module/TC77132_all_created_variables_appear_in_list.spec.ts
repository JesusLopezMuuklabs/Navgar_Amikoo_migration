import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77132 - Email Template Confirm all created variables appear in variable list
 * Original: muuk-tests/Flows_Module/TestSteps_38dff7f7.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77132 - Email Template: all created variables appear in variable list', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Add variable 1
  await page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).first().click({ timeout: 60000 });
  await page.locator(`//INPUT[@placeholder='Add variable name'][@type='text']`).fill('var1', { timeout: 60000 });
  await page.locator(`//DIV[normalize-space() = 'New variable "var1"']`).click({ timeout: 60000 });

  // Add variable 2
  await page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).nth(1).click({ timeout: 60000 });
  await page.locator(`//INPUT[@placeholder='Add variable name'][@type='text']`).fill('var2', { timeout: 60000 });
  await page.locator(`//DIV[normalize-space() = 'New variable "var2"']`).click({ timeout: 60000 });

  // Assert both variables appear in the Variables created pane
  await expect(page.locator(`//H6[normalize-space() = "Variables created"]/following::div[normalize-space() = "{{var1}}"][1]`)).toBeVisible({ timeout: 60000 });
  await expect(page.locator(`//H6[normalize-space() = "Variables created"]/following::div[normalize-space() = "{{var2}}"][1]`)).toBeVisible({ timeout: 60000 });

  // Cleanup
  await page.keyboard.press('Escape');
});
