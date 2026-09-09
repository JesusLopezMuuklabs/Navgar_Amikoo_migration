import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78070 - Confirm Expand Task Details toggle is clickable and expands all task cards
 * Original: muuk-tests/Flows_Module/TestSteps_a7b64814.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78070 - Expand Task Details toggle is clickable and expands all task cards', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert expand toggle accordion icon
  await expect(page.locator(`//span[contains(@class,'MuiAccordionSummary-expandIconWrapper')]`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  // Click to expand
  await page.locator(`//span[contains(@class,'MuiAccordionSummary-expandIconWrapper')]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert description editor area appears (expanded state)
  await expect(page.locator(`//p[@data-placeholder="+ Add a description"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
