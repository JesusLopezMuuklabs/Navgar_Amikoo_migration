import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77134 - Email Template Confirm ability to clear field with the x button
 * Original: muuk-tests/Flows_Module/TestSteps_38e0e9cd.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77134 - Email Template: ability to clear field with the x button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Open variable overlay and type a name
  await page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).first().click({ timeout: 60000 });
  await page.locator(`//INPUT[@placeholder='Add variable name'][@type='text']`).fill('clear test', { timeout: 60000 });
  await expect(page.locator(`//DIV[normalize-space() = 'New variable "clear test"']`)).toBeVisible({ timeout: 60000 });

  // Click the X icon to clear the field
  await page.locator(`//INPUT[@placeholder='Add variable name'][@type='text']//following::*[local-name()="svg"][@data-testid="HighlightOffOutlinedIcon"]`).click({ timeout: 60000 });

  // Assert field is cleared
  await expect(page.locator(`//INPUT[@placeholder='Add variable name'][@type='text']`)).toHaveValue('', { timeout: 60000 });

  await page.keyboard.press('Escape');
});
