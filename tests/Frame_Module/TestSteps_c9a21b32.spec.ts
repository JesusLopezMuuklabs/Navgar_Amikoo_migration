/**
 * Test Case ID: TC64169
 * Description: Main Command Bar Creation selector defaults to Projects when in the Projects module
 * Migrated from: muuk-tests/Frame_Module/TestSteps_c9a21b32.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64169 – Command Bar defaults to Projects when in the Projects module', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Navigate to Projects
  await framePage.navigateToProjects();

  // Verify "My projects" tab is visible
  await framePage.verifyMyProjectsTabVisible();

  // Hover and click the command-bar "Projects" context selector
  const projectsSelector = page.locator("//li[.//span[normalize-space(text())='Projects']]");
  await projectsSelector.hover({ timeout: 60000 });
  await projectsSelector.click({ timeout: 60000 });
});
