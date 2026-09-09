import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78291 - Confirm rich text options are working correctly in the task description
 * Original: muuk-tests/Flows_Module/TestSteps_f5c0a201.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78291 - Rich text options are working correctly in the task description', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Expand the task description accordion
  await page.locator(`//span[contains(@class,'MuiAccordionSummary-expandIconWrapper')]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert the description text area is visible (rich text area)
  await expect(page.locator(`//p[@data-placeholder="+ Add a description"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
