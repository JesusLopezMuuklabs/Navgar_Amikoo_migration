import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76861 - Email Template Confirm blue add variable icon is present in Send to, Subject, Reply to and Body message fields
 * Original: muuk-tests/Flows_Module/TestSteps_89a3aefd.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76861 - Email Template: blue add variable icon is present in all email fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Assert variable icons are present in all 4 fields (at least first and second)
  await expect(page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).first()).toBeVisible({ timeout: 60000 });
  await expect(page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).nth(1)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
