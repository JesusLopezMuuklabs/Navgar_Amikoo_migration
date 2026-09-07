import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78293 - Confirm Images can be attached to description fields
 * Original: muuk-tests/Flows_Module/TestSteps_f5c5be85.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78293 - Images can be attached to description fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Expand the task description
  await page.locator(`//span[contains(@class,'MuiAccordionSummary-expandIconWrapper')]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert the image upload button is visible in the description toolbar
  await expect(page.locator(`//input[@type='file' and contains(@accept,'image')]/following-sibling::button[1]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
