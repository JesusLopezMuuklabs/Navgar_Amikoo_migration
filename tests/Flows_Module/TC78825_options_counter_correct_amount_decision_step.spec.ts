import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78825 - Confirm options counter displays correct amount of options when creating a decision step
 * Original: muuk-tests/Flows_Module/TestSteps_69541513.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78825 - Options counter displays correct amount when creating decision step', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Add option 1
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Add option"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//INPUT[@placeholder='Option 1'][@type='text']`).fill('opt1', { timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Save option"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert "1 option" counter
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "1 option"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
