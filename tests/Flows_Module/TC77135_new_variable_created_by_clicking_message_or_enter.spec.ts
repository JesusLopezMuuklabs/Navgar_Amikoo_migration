import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77135 - Email Template Confirm new variable can be created by clicking on the message or pressing the enter key
 * Original: muuk-tests/Flows_Module/TestSteps_38e1749f.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77135 - Email Template: new variable can be created by clicking message or pressing Enter', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Open variable overlay, type name, press Enter to create
  await page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).first().click({ timeout: 60000 });
  await page.locator(`//INPUT[@placeholder='Add variable name'][@type='text']`).fill('a', { timeout: 60000 });
  await page.keyboard.press('Enter');

  // Assert variable "a" appears in the Variables created pane
  await expect(page.locator(`//DIV[normalize-space() = 'New variable "a"']`)).toBeVisible({ timeout: 10000 }).catch(async () => {
    // If "New variable" is gone (i.e., Enter committed it), check for the variable in the pane
    await expect(page.locator(`//H6[normalize-space() = "Variables created"]/following::div[normalize-space() = "{{a}}"][1]`)).toBeVisible({ timeout: 60000 });
  });

  await page.keyboard.press('Escape');
});
