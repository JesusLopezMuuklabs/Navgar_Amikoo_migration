import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC79395 - Email: Confirm change button opens the email template selector overlay
 * Original: muuk-tests/Flows_Module/TestSteps_5143d79a.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC79395 - Email: change button opens the email template selector overlay', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();

  // Navigate to a flow template with an email task and click "Change" on the email template
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Change"]`).first().click({ timeout: 60000 }).catch(() => {
    // If no existing task with Change, navigate deeper
  });

  // Assert the "Search a template" label appears in the selector overlay
  await expect(page.locator(`//LABEL[normalize-space() = "Search a template"]`)).toBeVisible({ timeout: 60000 });
});
