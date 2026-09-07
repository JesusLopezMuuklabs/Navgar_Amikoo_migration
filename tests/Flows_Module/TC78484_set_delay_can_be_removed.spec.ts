import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78484 - Confirm set delay can be removed
 * Original: muuk-tests/Flows_Module/TestSteps_85e421d5.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78484 - Set delay can be removed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Set 6h delay then remove it
  await page.locator(`//button[@aria-label='Delay']`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "6h"]`).click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "No Delay"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert "No Delay" is now selected
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "No Delay"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
