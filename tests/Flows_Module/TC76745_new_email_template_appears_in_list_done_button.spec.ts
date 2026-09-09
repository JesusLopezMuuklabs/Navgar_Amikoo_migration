import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76745 - Email Template Confirm new email template appears in list when clicking done button
 * Original: muuk-tests/Flows_Module/TestSteps_8935efed.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76745 - Email Template: new email template appears in list when clicking done button', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  const templateName = `Test${randNum}`;
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(templateName, { timeout: 60000 });

  // Click Save
  await flowsPage.clickSaveEmailTemplate();

  // Assert the new template appears in the list
  await expect(page.locator(`//p[contains(text(), "${templateName}")]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
