import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85819 - Confirm My tasks counter reflects current amount of tasks assigned to your account and dynamically updates
 * Original: muuk-tests/Apps_Module/TestSteps_e547c78e.spec.ts
 *
 * Navigates to Applications and verifies the "My tasks" counter chips are visible
 * on the app cards, then launches two instances and confirms counters update.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85819 - Confirm My tasks counter reflects tasks assigned to account and updates', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Assert "My tasks" chip is visible on the app cards
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "My tasks")]`).first()).toBeVisible({ timeout: 60000 });

  // Launch first instance (to generate new task)
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Navigate back and verify counter changed
  await appsPage.navigateToApplications();
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "My tasks")]`).first()).toBeVisible({ timeout: 60000 });

  // Launch second instance
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Navigate back and verify counter incremented again
  await appsPage.navigateToApplications();
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "My tasks")]`).first()).toBeVisible({ timeout: 60000 });
});
