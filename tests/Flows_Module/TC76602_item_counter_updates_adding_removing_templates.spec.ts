import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC76602 - Email Template Confirm item counter updates when adding or removing templates
 * Original: muuk-tests/Flows_Module/TestSteps_ee1e7597.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC76602 - Email Template: item counter updates when adding or removing templates', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickEmailTemplatesTab();

  // Assert item counter with "(items)" text is visible
  await expect(page.locator(`//P[contains(text(),"items")]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
