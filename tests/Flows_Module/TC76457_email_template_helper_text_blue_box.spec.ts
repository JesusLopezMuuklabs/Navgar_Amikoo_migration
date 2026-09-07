import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76457 - Email Template Confirm helper text appears in blue box
 * Original: muuk-tests/Flows_Module/TestSteps_ee3310f2.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76457 - Email Template: helper text appears in blue box', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickNew();
  await flowsPage.selectEmailTemplate();

  // Assert the blue info box with helper text is visible
  await flowsPage.assertHelperTextVisible();

  // Assert the comma-separator helper text is also visible
  await flowsPage.clickCommaSeparatorText();

  await page.keyboard.press('Escape');
});
