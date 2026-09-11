/**
 * Test Case ID: TC64180
 * Description: Main Command Bar Projects can be created
 * Migrated from: muuk-tests/Frame_Module/TestSteps_c9a51d4a.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64180 – Main Command Bar: Projects can be created', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Navigate to Projects module
  await framePage.navigateToProjects();

  // Hover "My projects" tab
  await framePage.hoverMyProjectsTab();

  // Fill project name and click "Add"
  await page.locator("INPUT[id='command-bar-input'][name='name'][type='text']").fill('Project', { timeout: 60000 });
  await page.locator("//BUTTON[@type='submit'][contains(text(),'Add')]").click({ timeout: 60000 });

  // Fill the project description
  await framePage.fillFlowDescription('Project Description');

  // Click the Tasks tab in the project
  await framePage.clickTasksTabInProject();

  // Add a task via the project task input
  await framePage.fillProjectTaskInput('Task');
  await framePage.pressEnter();

  // Reload the page (as in original) and navigate back to Projects
  await page.reload();
  await framePage.navigateToProjects();

  // Expand the project accordion (click the expand icon)
  await page.click('//span[contains(@class,"MuiAccordionSummary-expandIconWrapper")]');

  // Wait for load state
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });

  // Hover the task in the project grid to confirm it was created
  await expect(
    page.locator("//div[@data-field='legend']/descendant::div[normalize-space() = 'Task']")
  ).toBeVisible({ timeout: 30000 });

  // Check the task checkbox to complete it
  await page.locator("//input[@type='checkbox']").first().click({ timeout: 60000 });

  // Verify "Task completed successfully" toast
  await framePage.verifyTaskCompletedSuccessfully();

  // Press Escape
  await page.keyboard.press('Escape');

  // Hover the project name
  await expect(page.locator("//SPAN[contains(text(),'Project')]").nth(1)).toBeVisible({ timeout: 30000 });

  // Open project 3-dot menu and delete
  await framePage.clickProjectContextMenu();
  await framePage.clickDeleteProject();
  await framePage.confirmDeleteProject();
});
