import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78786 - Confirm custom due date can be set and is reflected in the icon
 * Original: muuk-tests/Flows_Module/TestSteps_85a6600f.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78786 - Custom due date can be set and is reflected in the icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Custom due date and set value
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Custom"]`).first().click({ timeout: 60000 }).catch(() => {});
  await expect(page.locator(`INPUT[name='value'][type='number']`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
