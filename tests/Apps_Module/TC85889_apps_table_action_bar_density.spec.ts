import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85889 - Apps Table action bar - Density
 * Original: muuk-tests/Apps_Module/TestSteps_2fd33da1.spec.ts
 *
 * Verifies clicking Compact/Standard/Comfortable in the Density menu updates
 * the row height of the data grid and only the chosen density is visible.
 *
 * Row heights: Compact=36px, Standard=52px, Comfortable=67px
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

test('TC85889 - Apps Table action bar - Density', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const appsPage  = new AppsPage(page);

  // Login
  await loginPage.goto(BASE_URL);
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page.locator("//span[normalize-space(text())='Applications']")).toBeVisible({ timeout: 60000 });

  // Navigate to app instances table
  await appsPage.navigateToApplications();
  await appsPage.assertApplicationsHeadingVisible();
  await appsPage.clickAppCard('Flow Template App Module');
  await appsPage.assertFlowTemplateHeadingVisible('Flow Template App Module');

  // ── Compact density ──
  await appsPage.clickDensityButton();
  await appsPage.clickDensityOption('Compact');
  await appsPage.assertRowHeightVisible(36);
  await appsPage.assertRowHeightNotVisible(52);
  await appsPage.assertRowHeightNotVisible(67);

  // ── Standard density ──
  await appsPage.clickDensityButton();
  await appsPage.clickDensityOption('Standard');
  await appsPage.assertRowHeightVisible(52);
  await appsPage.assertRowHeightNotVisible(36);
  await appsPage.assertRowHeightNotVisible(67);

  // ── Comfortable density ──
  await appsPage.clickDensityButton();
  await appsPage.clickDensityOption('Comfortable');
  await appsPage.assertRowHeightVisible(67);
  await appsPage.assertRowHeightNotVisible(36);
  await appsPage.assertRowHeightNotVisible(52);

  // ── Cycle back: Compact ──
  await appsPage.clickDensityButton();
  await appsPage.clickDensityOption('Compact');
  await appsPage.assertRowHeightVisible(36);
  await appsPage.assertRowHeightNotVisible(52);
  await appsPage.assertRowHeightNotVisible(67);

  // ── Standard again ──
  await appsPage.clickDensityButton();
  await appsPage.clickDensityOption('Standard');
  await appsPage.assertRowHeightVisible(52);
  await appsPage.assertRowHeightNotVisible(36);
  await appsPage.assertRowHeightNotVisible(67);

  // ── Comfortable again ──
  await appsPage.clickDensityButton();
  await appsPage.clickDensityOption('Comfortable');
  await appsPage.assertRowHeightVisible(67);
  await appsPage.assertRowHeightNotVisible(36);
  await appsPage.assertRowHeightNotVisible(52);
});
