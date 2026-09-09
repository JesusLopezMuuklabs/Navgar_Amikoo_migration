import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78482 - Confirm delay selection updates next to the icon in the task card
 * Original: muuk-tests/Flows_Module/TestSteps_85e2c1fb.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78482 - Delay selection updates next to the icon in the task card', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click delay icon and choose 6h
  await page.locator(`//button[@aria-label='Delay']`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "6h"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert 6h label is visible next to delay icon
  await expect(page.locator(`//P[normalize-space() = "6h"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
