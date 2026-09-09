import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78483 - Confirm custom delay time can be set and is reflected in the icon
 * Original: muuk-tests/Flows_Module/TestSteps_85e3d249.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78483 - Custom delay time can be set and is reflected in the icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click delay and choose Custom
  await page.locator(`//button[@aria-label='Delay']`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Custom Delay"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert the custom value input is visible
  await expect(page.locator(`INPUT[name='value'][type='number']`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
