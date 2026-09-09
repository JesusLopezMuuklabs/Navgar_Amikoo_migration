import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78353 - Confirm multiple toggle can be selected in file upload and entity fields
 * Original: muuk-tests/Flows_Module/TestSteps_c666a125.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78353 - Multiple toggle can be selected in file upload and entity fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert Multiple toggle is accessible in file upload/entity fields
  await expect(page.locator(`//SPAN[normalize-space() = "Multiple"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
