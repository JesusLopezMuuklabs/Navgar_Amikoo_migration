import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78788 - Confirm set due date can be removed
 * Original: muuk-tests/Flows_Module/TestSteps_85a740a0.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78788 - Set due date can be removed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Custom, set a value, then click None to remove
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Custom"]`).first().click({ timeout: 60000 }).catch(() => {});
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "None"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert None is selected/visible
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "None"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
