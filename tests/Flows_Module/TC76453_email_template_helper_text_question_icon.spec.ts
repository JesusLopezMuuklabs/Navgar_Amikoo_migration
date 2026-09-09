import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76453 - Email Template Confirm helper text appears when mousing over question icon
 * Original: muuk-tests/Flows_Module/TestSteps_ee2e4ea5.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76453 - Email Template: helper text appears when mousing over question icon', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  // Hover over Public? label — reveals helper tooltip
  await flowsPage.hoverPublicLabel();

  // Assert the tooltip / helper container is visible
  await expect(page.locator(`//P[normalize-space() = "Public?"]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
