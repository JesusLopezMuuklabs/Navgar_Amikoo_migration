import { Page, Locator } from '@playwright/test';

/**
 * ProfileMenuComponent
 * The header dropdown menu opened by the Profile avatar/button.
 * Reused across ALL Admin test groups (test1–test5).
 *
 * Muuk origin: dashboardStagingNavgupzppbviuhmp
 */
export class ProfileMenuComponent {
  readonly page: Page;

  /** The clickable Profile Menu button in the header. */
  readonly profileMenuButton: Locator;

  /** "Accounts" link inside the dropdown (index 1 — there are two "Accounts" links on the page). */
  readonly accountsLink: Locator;

  /**
   * "Profile" link inside the dropdown (index 1 — distinguishes from other Profile anchors).
   * Used by test2 (TC84153), test3, test4, test5.
   */
  readonly profileLink: Locator;

  /**
   * "Applications" span inside the dropdown.
   * Used by test3 (a4fb0cf5 — TC84154 verifies this after an Update).
   */
  readonly applicationsSpan: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileMenuButton = page.locator(`//div[@role="button"][@aria-label="Profile Menu"]`);
    this.accountsLink      = page.locator(`//A[normalize-space() = "Accounts"]`).nth(1);
    this.profileLink       = page.locator(`//A[normalize-space() = "Profile"]`).nth(1);
    this.applicationsSpan  = page.locator(`//SPAN[normalize-space() = "Applications"]`);
  }

  /** Open the profile dropdown menu. */
  async open(): Promise<void> {
    await this.profileMenuButton.click({ timeout: 60000 });
  }

  /** Open the menu and navigate to the Accounts list page. */
  async navigateToAccounts(): Promise<void> {
    await this.open();
    await this.accountsLink.click({ timeout: 60000 });
  }

  /** Open the menu and navigate to the Edit Profile page. */
  async navigateToProfile(): Promise<void> {
    await this.open();
    await this.profileLink.click({ timeout: 60000 });
  }
}
