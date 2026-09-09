import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76458 - Email Template Confirm helper text can be closed
 * Original: muuk-tests/Flows_Module/TestSteps_ee337854.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76458 - Email Template: helper text can be closed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  // Hover to trigger the helper text banner visibility
  await flowsPage.hoverHelperText();

  // Click the X button on the helper banner
  await flowsPage.clickCloseHelperBanner();

  // Assert the helper text is no longer visible
  await flowsPage.assertHelperTextNotVisible();

  await page.keyboard.press('Escape');
});
