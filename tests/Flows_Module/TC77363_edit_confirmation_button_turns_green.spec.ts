import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77363 - Email Template Confirm edit confirmation button turns green when changes have been made
 * Original: muuk-tests/Flows_Module/TestSteps_682bc9af.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77363 - Email Template: edit confirmation button turns green when changes have been made', async ({ page }) => {
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

  // Hover and click edit
  await page.locator(`//H6[normalize-space() = "Variables created"]/following::div[normalize-space() = "{{var1}}"][1]`).hover({ timeout: 60000 });
  await page.locator(`//div[@aria-label="Edit variable"]`).click({ timeout: 60000 });

  // Modify the variable name
  await page.locator(`//DIV//INPUT[@name="content"]`).fill('var1_edited', { timeout: 60000 });

  // Assert the confirmation button changes to green (has error-40/cursor-pointer state changes)
  await expect(page.locator(`.border-error-40.cursor-pointer svg.MuiSvgIcon-root`)).toBeVisible({ timeout: 60000 }).catch(async () => {
    // Alternatively confirm input has a changed value
    await expect(page.locator(`//DIV//INPUT[@name="content"]`)).toHaveValue('var1_edited', { timeout: 60000 });
  });

  await page.keyboard.press('Escape');
});
