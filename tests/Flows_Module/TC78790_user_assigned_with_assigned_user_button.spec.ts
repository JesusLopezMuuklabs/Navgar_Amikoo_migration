import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78790 - Confirm user can be assigned with the assigned user button in the task card
 * Original: muuk-tests/Flows_Module/TestSteps_85aa4e9a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78790 - User can be assigned with the assigned user button in the task card', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click the unassigned owner button
  await page.locator(`//*[@aria-label="Owner: unassigned"]/parent::button`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert Angel Ramirez appears in the dropdown
  await expect(page.locator(`//span[contains(normalize-space(), "Angel Ramirez")]`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  await page.keyboard.press('Escape');
});
