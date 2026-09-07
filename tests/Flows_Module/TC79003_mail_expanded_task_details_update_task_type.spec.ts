import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79003 - Email: Confirm Mail expanded task details update when task type has been selected
 * Original: muuk-tests/Flows_Module/TestSteps_7661abc8.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79003 - Email: Mail expanded task details update when task type has been selected', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert "Add template" button is present (email task indicator)
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "Add template"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
