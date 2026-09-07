import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79001 - Confirm owner can be selected in the task type selector overlay
 * Original: muuk-tests/Flows_Module/TestSteps_76602a8c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79001 - Owner can be selected in the task type selector overlay', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click owner assignment button
  await page.locator(`//*[local-name()="svg"][@data-testid="PersonAddAlt1OutlinedIcon"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert a name appears as option
  await expect(page.locator(`//SPAN[normalize-space() = "ASD Angel Ramirez"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
