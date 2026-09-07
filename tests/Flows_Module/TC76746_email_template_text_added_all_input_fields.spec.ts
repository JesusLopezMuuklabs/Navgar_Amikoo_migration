import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76746 - Email Template Confirm text can be added to all input fields
 * Original: muuk-tests/Flows_Module/TestSteps_8936fb3e.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76746 - Email Template: text can be added to all input fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Fill Subject field
  await page.locator(`//p[@data-placeholder="Subject"]`).click({ timeout: 60000 });
  await page.keyboard.type('Test Subject');

  // Fill Reply to field
  await page.locator(`//p[@data-placeholder="Reply to"]`).click({ timeout: 60000 });
  await page.keyboard.type('test@example.com');

  // Fill Body message field
  await page.locator(`p[data-placeholder="Body message"]`).click({ timeout: 60000 });
  await page.keyboard.type('Test body content');

  // Assert Save button is visible (all fields can be filled)
  await expect(page.locator(`//BUTTON[@type='submit'][normalize-space() = "Save"]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
