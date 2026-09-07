import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77074 - Email Template Confirm rich text options are usable in the Body message field
 * Original: muuk-tests/Flows_Module/TestSteps_6d2e03f4.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77074 - Email Template: rich text options are usable in the Body message field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Assert Bold button is visible (rich text)
  await expect(page.locator(`//STRONG[normalize-space() = "B"]`)).toBeVisible({ timeout: 60000 });

  // Assert Italic button is visible
  await expect(page.locator(`//i[normalize-space() = "I"]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
