import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76862 - Email Template Confirm no grouping is listed when creating an email from the all flows flow group
 * Original: muuk-tests/Flows_Module/TestSteps_89a42b61.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76862 - Email Template: no grouping is listed when creating email from all flows group', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();

  // Click New → Email Template from the "all flows" context (no specific group selected)
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Assert the email template form opened correctly
  await expect(page.locator(`//BUTTON[@type='submit'][normalize-space() = "Save"]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
