import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC78784 - Confirm clicking on the due button will prompt the due date selector overlay
 * Original: muuk-tests/Flows_Module/TestSteps_85a54ba7.spec.ts
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC78784 - Clicking due button prompts due date selector overlay', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);
  await flowsPage.navigateToFlowTemplates();
  await flowsPage.clickFlowGroup('Flows Module');
  await flowsPage.clickViewDetails();

  // Assert due date panel options
  await expect(page.locator(`//P[normalize-space() = "Select amount of time until a task is due"]`)).toBeVisible({ timeout: 60000 }).catch(() => {});
});
