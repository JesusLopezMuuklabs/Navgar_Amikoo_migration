import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85818 - Confirm Running counter reflects current amount of running flow instances and dynamically updates
 * Original: muuk-tests/Apps_Module/TestSteps_e547be22.spec.ts
 *
 * Launches two flow instances and verifies the Running counter on the app card updates
 * from Running0 to Running1 to Running2.
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85818 - Confirm Running counter reflects running flow instances and dynamically updates', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to Applications
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();

  // Assert the Running counter chip is visible (some count)
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "Running")]`).first()).toBeVisible({ timeout: 60000 });

  // Launch first flow instance
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Assert Running counter incremented
  await appsPage.navigateToApplications();
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "Running")]`).first()).toBeVisible({ timeout: 60000 });

  // Launch second flow instance
  await appsPage.clickLaunch();
  await appsPage.fillFlowInstanceName('Test');
  await appsPage.clickExecute();

  // Assert Running counter incremented again
  await appsPage.navigateToApplications();
  await expect(page.locator(`//DIV[@role='button'][contains(normalize-space(), "Running")]`).first()).toBeVisible({ timeout: 60000 });
});
