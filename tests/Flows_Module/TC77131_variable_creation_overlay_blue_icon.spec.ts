import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77131 - Email Template Confirm variable creation overlay appears when clicking on the blue variable icon
 * Original: muuk-tests/Flows_Module/TestSteps_38df8959.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';
const RAND_NAME = 'Test';

test('TC77131 - Email Template: variable creation overlay appears when clicking on the blue variable icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  // Navigate to Flow Templates → New → Email Template
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  // Fill template name
  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`${RAND_NAME}${randNum}`, { timeout: 60000 });

  // Click the blue variable icon in the subject field (first occurrence)
  await page.locator(`//div[@aria-label="Click here to add a variable in this field"]`).first().click({ timeout: 60000 });

  // Assert variable creation overlay is visible
  await expect(page.locator(`//LABEL[normalize-space() = "Variable name"]`)).toBeVisible({ timeout: 60000 });

  // Cleanup: close overlay
  await page.keyboard.press('Escape');
});
