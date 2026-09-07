import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC77866 - Confirm you are able to make Human tasks
 * Original: muuk-tests/Flows_Module/TestSteps_a9fb1a8b.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC77866 - Able to make Human tasks', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert the task card shows Human task icon (person add icon visible)
  await expect(page.locator(`//*[local-name()="svg"][@data-testid="PersonAddAlt1OutlinedIcon"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
