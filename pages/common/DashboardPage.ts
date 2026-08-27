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

  /**
   * Open the Profile Menu and click "Profile" to navigate to the Edit Profile page.
   * Muuk origin: pageDetails6.spandBsGveI6J1Field → pageDetails8.aAru7e8TVR8Field
   * Used by: TC84153 (test2/a4fb0c92)
   */
  async navigateToProfile() {
    await this.page.locator('//div[@role="button"][@aria-label="Profile Menu"]').click({ timeout: 60000 });
    await this.page.locator('//A[normalize-space() = "Profile"]').nth(1).click({ timeout: 60000 });
  }
}