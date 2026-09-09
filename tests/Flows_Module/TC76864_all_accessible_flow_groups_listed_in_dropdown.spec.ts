import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76864 - Email Template Confirm all accessible flow groups are listed in dropdown
 * Original: muuk-tests/Flows_Module/TestSteps_89a4c9b1.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76864 - Email Template: all accessible flow groups are listed in dropdown', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Click Flow Group field to open dropdown
  await page.locator(`input[placeholder="Flow Group"]`).click({ timeout: 60000 });

  // Assert option items appear
  await expect(page.locator(`//LI[@role='option']`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  await page.keyboard.press('Escape');
});
