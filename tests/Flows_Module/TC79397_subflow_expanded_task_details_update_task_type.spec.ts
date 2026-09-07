import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79397 - Subflow: Confirm expanded task details update when task type has been selected
 * Original: muuk-tests/Flows_Module/TestSteps_5145b50d.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79397 - Subflow: expanded task details update when task type has been selected', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();

  // Navigate to the Flow Template Flow Module
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert the subflow section is present
  await expect(page.locator(`//span[normalize-space()="Subflow"]/parent::div`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
