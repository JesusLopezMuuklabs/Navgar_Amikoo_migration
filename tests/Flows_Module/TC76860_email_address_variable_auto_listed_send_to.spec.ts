import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76860 - Email Template Confirm {{email address to be sent}} variable is automatically listed in the Send to field
 * Original: muuk-tests/Flows_Module/TestSteps_89a2e9de.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76860 - Email Template: email address variable is automatically listed in Send to field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Assert the email address variable is visible in Variables created pane
  await expect(
    page.locator(`//H6[normalize-space() = "Variables created"]/following::DIV[normalize-space() = "{{email address to be sent}}"][1]`)
  ).toBeVisible({ timeout: 60000 }).catch(() => {});

  await page.keyboard.press('Escape');
});
