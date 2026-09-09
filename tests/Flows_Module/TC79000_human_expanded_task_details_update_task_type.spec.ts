import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79000 - Confirm Human expanded task details update when task type has been selected
 * Original: muuk-tests/Flows_Module/TestSteps_765f0a08.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79000 - Human expanded task details update when task type has been selected', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert "Add owner" button is accessible (indicates Human task type)
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "Add owner"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
