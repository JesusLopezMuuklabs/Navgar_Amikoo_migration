/**
 * Test Case ID: TC64593
 * Description: Filters change depending on the category selected
 * Migrated from: muuk-tests/Frame_Module/TestSteps_5a75e161.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64593 – Filters change depending on category selected in expanded search', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Open search with Alt+K hotkey and type
  await framePage.openSearchWithHotkey();
  await framePage.typeInSearch('Test');

  // Click the "Tasks" filter button
  await framePage.clickFilterButton('Tasks');

  // Tasks: "Show all" should be visible; Running flows and Groups should not
  await framePage.verifyTasksShowAllVisible();
  await framePage.verifyRunningFlowsShowAllNotVisible();
  await framePage.verifyGroupsShowAllNotVisible();

  // Click "Running flows" filter
  await framePage.clickFilterButton('Running flows');

  // Running flows visible, Tasks & Groups not visible
  await framePage.verifyRunningFlowsShowAllVisible();
  await framePage.verifyTasksShowAllNotVisible();
  await framePage.verifyGroupsShowAllNotVisible();

  // Click "Groups" filter
  await framePage.clickFilterButton('Groups');

  // Groups visible, Tasks & Running flows not visible
  await framePage.verifyGroupsShowAllVisible();
  await framePage.verifyRunningFlowsShowAllNotVisible();
  await framePage.verifyTasksShowAllNotVisible();
});
