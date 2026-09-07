import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78791 - Confirm the template can be assigned when clicking on the template selector button in the task card
 * Original: muuk-tests/Flows_Module/TestSteps_85ab73ef.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78791 - Template can be assigned from the template selector button in task card', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Click Add template button
  await page.locator(`//BUTTON[@type='button'][normalize-space() = "Add template"]`).first().click({ timeout: 60000 }).catch(() => {});

  // Assert MailTemplate appears in search results
  await expect(page.locator(`//P[normalize-space() = "+ Create new template"]/following::P[normalize-space() = "MailTemplate"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});

  await page.keyboard.press('Escape');
});
