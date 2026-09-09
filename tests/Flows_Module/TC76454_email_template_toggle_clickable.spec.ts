import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76454 - Email Template Confirm toggle is clickable
 * Original: muuk-tests/Flows_Module/TestSteps_ee2f7242.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76454 - Email Template: toggle is clickable', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  // Hover over Public? label
  await flowsPage.hoverPublicLabel();

  // Click the Public toggle
  await flowsPage.clickPublicToggle();

  // Assert toggle is now active/visible
  await expect(page.locator(`//span[contains(@class, "MuiSwitch")]`)).toBeVisible({ timeout: 60000 });

  await page.keyboard.press('Escape');
});
