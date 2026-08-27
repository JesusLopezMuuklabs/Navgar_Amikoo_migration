import { Page } from '@playwright/test';

/**
 * ProjectsPage
 * Represents the Projects list view (sidebar nav + project cards/rows).
 */
export class DashboardPage {
  constructor(private readonly page: Page) {}

  // ─── Navigation ───────────────────────────────────────────────────────────

  async navigateToProjects() {
    await this.page.locator('//SPAN[contains(text(),"Projects")]').click({ timeout: 60000 });
  }

   async navigateToAccounts() {
    await this.page.getByRole('button', { name: 'Profile Menu' }).click({ timeout: 60000 });
    await this.page.getByRole('link', { name: 'Accounts', exact: true }).click({ timeout: 60000 });
  }
}