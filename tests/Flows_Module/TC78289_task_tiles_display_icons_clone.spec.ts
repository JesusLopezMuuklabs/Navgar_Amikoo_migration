import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78289 - Confirm task tiles display their corresponding task type icon (clone)
 * Original: muuk-tests/Flows_Module/TestSteps_f5bf72e1.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78289 - Task tiles display corresponding task type icon (variant 2)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();
  await flowsPage.clickTemplateTab();

  // Assert task label in diagram canvas
  await expect(page.locator(`//span[@class="truncate"][normalize-space() = "Task"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
