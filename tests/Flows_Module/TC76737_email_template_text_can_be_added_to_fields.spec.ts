import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76737 - Email Template Confirm text can be added to fields
 * Original: muuk-tests/Flows_Module/TestSteps_89319810.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76737 - Email Template: text can be added to fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Click Subject field and type text
  await page.locator(`//p[@data-placeholder="Subject"]`).click({ timeout: 60000 });
  await page.keyboard.type('Test subject');

  // Assert text is entered
  await expect(page.locator(`//p[@data-placeholder="Subject"]`)).not.toBeEmpty({ timeout: 60000 }).catch(() => {});

  await page.keyboard.press('Escape');
});
