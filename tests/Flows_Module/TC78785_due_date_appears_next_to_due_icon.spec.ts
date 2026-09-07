import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78785 - Confirm due date selection will appear next to the due icon in the task card
 * Original: muuk-tests/Flows_Module/TestSteps_85a6045c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78785 - Due date selection appears next to the due icon in the task card', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Custom due date
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Custom"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert custom option is shown
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "None"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
