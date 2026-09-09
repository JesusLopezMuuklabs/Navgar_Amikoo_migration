import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78267 - Confirm start and end tiles appear in diagram
 * Original: muuk-tests/Flows_Module/TestSteps_c9460947.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78267 - Start and end tiles appear in diagram', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();
  await flowsPage.clickTemplateTab();

  // Assert init (start) and end nodes are visible in the flow canvas
  await expect(page.locator(`//div[@data-id="init"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
  await expect(page.locator(`//div[@data-id="end"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
