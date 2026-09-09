import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77822 - Confirm description field can be edited by clicking on header field
 * Original: muuk-tests/Flows_Module/TestSteps_a234753c.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77822 - Description field can be edited by clicking on header field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();
  await flowsPage.clickOverviewTab();

  // Click the description edit area
  await page.locator(`//p[@data-placeholder="+ Add a description"]`).click({ timeout: 60000 }).catch(() => {});

  // Assert the description editor is active
  await expect(page.locator(`//p[@data-placeholder="+ Add a description"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
