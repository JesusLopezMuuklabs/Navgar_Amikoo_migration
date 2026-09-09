import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { FlowsPage } from '../../pages/Flows_Module/FlowsPage';

/*
 * TC_A74441 - New button Schedule a flow button opens flow selector drawer
 * Original: muuk-tests/Flows_Module/TestSteps_12c465f8.spec.ts
 */

const BASE_URL  = process.env.BASE_URL ?? '';
const EMAIL     = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD  = process.env.TEST_USER_PASSWORD ?? '';

test('TC_A74441 - New button Schedule a flow button opens flow selector drawer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flowsPage = new FlowsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  // Navigate to Flow Templates
  await flowsPage.navigateToFlowTemplates();

  // Click "Schedule a flow" from New button
  await flowsPage.assertScheduleFlowLabelVisible();
});
