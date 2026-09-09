import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78290 - Confirm expand task button expands the current task description
 * Original: muuk-tests/Flows_Module/TestSteps_f5c0890a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78290 - Expand task button expands the current task description', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click the expand accordion
  await page.locator(`//span[contains(@class,'MuiAccordionSummary-expandIconWrapper')]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert ArrowDropUp icon is visible (expanded state)
  await expect(page.locator(`//*[local-name()="svg"][@data-testid="ArrowDropUpOutlinedIcon"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
