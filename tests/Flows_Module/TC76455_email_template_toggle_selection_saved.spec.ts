import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76455 - Email Template Confirm toggle selection is saved correctly
 * Original: muuk-tests/Flows_Module/TestSteps_ee308675.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76455 - Email Template: toggle selection is saved correctly', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  // Hover over Public? label, then click the toggle
  await flowsPage.hoverPublicLabel();
  await flowsPage.clickPublicToggle();

  // Assert the active/colored state indicator is visible (toggle ON state)
  await flowsPage.assertPublicToggleOnVisible();

  await page.keyboard.press('Escape');
});
