import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/common/LoginPage';
import { AppsPage } from '../../pages/Apps_Module/AppsPage';

/*
 * TC85887 - Apps Table action bar - Columns
 * Original: muuk-tests/Apps_Module/TestSteps_2fd33cb5.spec.ts
 *
 * Verifies the Columns panel in the app instances table toolbar:
 * - Can search columns (Detail panel toggle, Flow Instance Name, Progress, Chat,
 *   Status, Alerts, Launched at, Concluded at, Current owners, Task completion)
 * - Toggling a column hides its header from the grid
 * - Pressing Reset restores all columns
 */

const BASE_URL = process.env.BASE_URL ?? '';
const EMAIL    = process.env.TEST_USER_EMAIL ?? '';
const PASSWORD = process.env.TEST_USER_PASSWORD ?? '';

const COLUMNS = [
  { label: 'Detail panel toggle', presentation: 'Detail panel toggle' },
  { label: 'Flow Instance Name',  presentation: 'Flow Instance Name'  },
  { label: 'Progress',            presentation: 'Progress'            },
  { label: 'Chat',                presentation: 'Chat'                },
  { label: 'Status',              presentation: 'Status'              },
  { label: 'Alerts',              presentation: 'Alerts'              },
  { label: 'Launched at',         presentation: 'Launched at'         },
  { label: 'Concluded at',        presentation: 'Concluded at'        },
  { label: 'Current owners',      presentation: 'Current owners'      },
  { label: 'Task completion',     presentation: 'Task completion'     },
] as const;

test('TC85887 - Apps Table action bar - Columns', async ({ page }) => {
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

  // Open Columns panel – Reset should be disabled initially
  await appsPage.clickColumnsButton();
  await appsPage.assertResetButtonDisabled();

  // Search for each column in the panel and verify the label appears
  for (const col of COLUMNS) {
    await appsPage.searchColumn(col.label);
    await appsPage.assertColumnLabelVisible(col.label);
    await appsPage.clickColumnSearchClear();
  }

  // Toggle each column off via span label and verify column header disappears
  for (const col of COLUMNS) {
    await appsPage.clickColumnsButton();
    await appsPage.clickColumnSpanLabel(col.label);
    await page.keyboard.press('Escape');
    await appsPage.assertColumnHidden(col.presentation);
  }

  // Open Columns panel and click Reset – all columns should reappear
  await appsPage.clickColumnsButton();
  await appsPage.clickResetColumns();
  await appsPage.clickColumnsButton();

  for (const col of COLUMNS) {
    await appsPage.assertColumnVisible(col.presentation);
  }
});
