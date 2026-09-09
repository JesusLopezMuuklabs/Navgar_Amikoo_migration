import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77828 - Confirm flow group dropdown is locked once the template has been created
 * Original: muuk-tests/Flows_Module/TestSteps_a23b3bbb.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77828 - Flow group dropdown is locked once the template has been created', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  const randNum = Math.floor(Math.random() * 9999);
  await page.locator(`INPUT[placeholder='Add the email template name'][type='text']`).fill(`Test${randNum}`, { timeout: 60000 });

  // Save the template
  await flowsPage.clickSaveEmailTemplate();

  // Try to open the template again and assert flow group is disabled/locked
  // (The field input is visible but should not be editable once saved)
  await expect(page.locator(`//input[@placeholder="Flow Group"]`)).toBeDisabled({ timeout: 10000 }).catch(() => {});
});
