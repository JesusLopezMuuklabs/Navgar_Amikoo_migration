/**
 * Test Case ID: TC64032
 * Description: Test functionality of the module button sidebar
 * Migrated from: muuk-tests/Frame_Module/TestSteps_eb94463e.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64032 – Test functionality of the module button sidebar', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Navigate to Messages and verify header
  await framePage.navigateToMessages();
  await framePage.verifyAllMessagesHeader();

  // Navigate to Tasks and verify header
  await framePage.navigateToTasks();
  await framePage.verifyInboxHeader();

  // Navigate to Flow Templates and verify header + Create Flow Group button
  await framePage.navigateToFlowTemplates();
  await framePage.verifyFlowTemplatesHeader();
  await expect(page.locator("//button[contains(text(), 'New Flow Group')]")).toBeVisible({ timeout: 30000 });

  // Navigate to Running Flows and verify header
  await framePage.navigateToRunningFlows();
  await framePage.verifyRunningFlowsHeader();

  // Navigate to Projects and verify "My projects" tab
  await framePage.navigateToProjects();
  await framePage.verifyMyProjectsTabVisible();
});
