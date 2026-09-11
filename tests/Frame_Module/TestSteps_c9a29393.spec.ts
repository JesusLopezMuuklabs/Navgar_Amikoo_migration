/**
 * Test Case ID: TC64174
 * Description: Main Command Bar Tasks can be created and assigned to users
 * Migrated from: muuk-tests/Frame_Module/TestSteps_c9a29393.spec.ts
 */
import { expect } from '@playwright/test';
import { test } from '../fixture';
import { FrameModulePage } from '../../pages/Frame_Module/FrameModulePage';
import { LoginPage } from '../../pages/common/LoginPage';

const EMAIL = 'angel.ramirez@muuklabs.com';
const PASSWORD = 'Angel_drums1';
const URL_BASE = 'https://dashboard.staging.navgar.app/';

test('TC64174 – Main Command Bar: Tasks can be created and assigned to users', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const framePage = new FrameModulePage(page);

  // Login
  await loginPage.goto(URL_BASE);
  await framePage.loginWithRetry(URL_BASE, EMAIL, PASSWORD);

  // Navigate to Tasks module
  await page.locator("//SPAN[contains(text(),'Tasks')]").nth(0).click({ timeout: 60000 });

  // Hover the command bar input
  await page.locator("INPUT[id='command-bar-input'][name='legend'][type='text']").hover({ timeout: 60000 });

  // Wait briefly
  await page.waitForTimeout(2000);

  // Clean up any pre-existing "Task" row via JS snippet logic
  const taskSelector = '//div[@role="gridcell"][@data-field="legend"]/a/span[normalize-space() = "Task"]';
  const taskLocator = page.locator(taskSelector);
  let taskCount = 0;
  try {
    await taskLocator.first().waitFor({ state: 'visible', timeout: 5000 });
    taskCount = await taskLocator.count();
  } catch { taskCount = 0; }

  if (taskCount > 0) {
    await page.click('//button[contains(text(), "Select Tasks")]');
    await page.click('//input[@name="select_all_rows"]');
    await page.click('//button[@id="more-menu"]');
    await page.click('//span[contains(text(), "Delete")]');
    await page.keyboard.press('Enter');
    for (let i = 0; i < 3; i++) { await page.keyboard.press('Tab'); }
    await page.keyboard.press('Enter');
  }

  // Wait briefly
  await page.waitForTimeout(2000);

  // Fill task name with assignee hint "@victor"
  await page.locator("INPUT[id='command-bar-input'][name='legend'][type='text']").fill('Task @', { timeout: 60000 });

  // Wait for search dropdown
  await page.waitForTimeout(1000);

  // Fill assignee search
  await page.locator("INPUT[placeholder='Search'][type='text']").fill('victor', { timeout: 60000 });

  // Press Enter to confirm selection
  await page.keyboard.press('Enter');

  // Wait briefly
  await page.waitForTimeout(2000);

  // Click the "Add" submit button
  await framePage.clickCommandBarAdd();

  // Wait for task to be created
  await page.waitForTimeout(2000);

  // Navigate to "To Others" filter to see the assigned task
  await framePage.clickToOthersFilter();

  // Verify the task appears
  await framePage.verifyTaskVisible();

  // Check the task checkbox to complete it
  await framePage.checkFirstTaskCheckbox();

  // Verify "No tasks assigned to others" (task was completed/removed)
  await framePage.verifyNoRowsVisible();

  // Wait
  await page.waitForTimeout(1000);
});
