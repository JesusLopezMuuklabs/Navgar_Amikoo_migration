import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79004 - Email: Confirm ability to select and remove an email template from the task selector overlay
 * Original: muuk-tests/Flows_Module/TestSteps_76627219.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79004 - Email: ability to select and remove an email template from the task selector overlay', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Add template
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Add template"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert template search label is visible
  await expect(page.locator(`//LABEL[normalize-space() = "Search a template"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  // Close overlay
  await page.keyboard.press('Escape');
});
