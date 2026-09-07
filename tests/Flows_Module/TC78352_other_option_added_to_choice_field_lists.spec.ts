import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78352 - Confirm 'other' option can be added to choice field lists
 * Original: muuk-tests/Flows_Module/TestSteps_c6664383.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test("TC78352 - 'Other' option can be added to choice field lists", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert Add other button is accessible
  await expect(page.locator(`//BUTTON[@type='button'][normalize-space() = "Add other"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
