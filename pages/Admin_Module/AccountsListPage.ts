import { Page, Locator } from '@playwright/test';

/**
 * AccountsListPage
 * The `/accounts` page listing all organizations/accounts available to the user.
 * Covers flows from test1, test2, test4, and test5.
 *
 * Muuk origins:
 *   dashboardStagingNavgkfsq0sqyxlg (list page)
 *   dashboardStagingNavgvjr1scz3vz9l (current-account badge)
 *   dashboardStagingNavgdm2hlm5bgbh  (account name span link – Feature Flag env)
 */
export class AccountsListPage {
  readonly page: Page;

  // ── Page heading ─────────────────────────────────────────────────────────
  /** H1 "Accounts" heading — used to assert landing on this page. */
  readonly pageHeading: Locator;

  // ── Account rows ─────────────────────────────────────────────────────────
  /**
   * First td cell in a row containing the text "MuukTest".
   * index 0 → first matching td.
   */
  readonly muukTestRow: Locator;

  /**
   * Second td cell in a row containing the text "MuukTest".
   * index 1 → second matching td (TC84091: two cells visible).
   */
  readonly muukTestRowSecond: Locator;

  /**
   * Avatar img whose alt attribute contains "MuukTest".
   * Used by TC84092.
   */
  readonly muukTestAvatar: Locator;

  /**
   * "Switch" link for the "MuukTest - Feature Flag Environment" row.
   * Used by TC84093 to switch accounts.
   */
  readonly featureFlagSwitchLink: Locator;

  /**
   * "Current Account" badge that appears after switching to
   * "MuukTest - Feature Flag Environment".
   * Used by TC84093 to verify the switch succeeded.
   */
  readonly featureFlagCurrentBadge: Locator;

  /**
   * "View" link on the first account row — navigates to account members page.
   * index 0 → first "View" anchor on the page.
   */
  readonly viewLink: Locator;

  /**
   * "MuukTest - Feature Flag Environment" account name span link.
   * Clicking it opens the account detail/members page.
   * Used by test2 (TC84104+) and test4.
   */
  readonly featureFlagAccountLink: Locator;

  /**
   * "MuukTest - Production Environment" account name span link.
   * Used by test5 (TC_A84151/TC_A84152).
   */
  readonly productionAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading           = page.locator(`//H1[normalize-space() = "Accounts"]`);
    this.muukTestRow           = page.locator(`//td[.//text()[contains(., 'MuukTest')]]`).nth(0);
    this.muukTestRowSecond     = page.locator(`//td[.//text()[contains(., 'MuukTest')]]`).nth(1);
    this.muukTestAvatar        = page.locator(`//td//img[contains(@alt, 'MuukTest')]`);
    this.featureFlagSwitchLink = page.locator(
      `//tr[.//span[contains(text(), 'MuukTest - Feature Flag Environment')]]//a[@label='Switch']`
    );
    this.featureFlagCurrentBadge = page.locator(
      `//tr[.//span[contains(text(), 'MuukTest - Feature Flag Environment')]]//div[text()='Current Account']`
    );
    this.viewLink              = page.locator(`//A[normalize-space() = "View"]`).nth(0);
    this.featureFlagAccountLink = page.locator(`//SPAN[normalize-space() = "MuukTest - Feature Flag Environment"]`);
    this.productionAccountLink  = page.locator(`//SPAN[normalize-space() = "MuukTest - Production Environment"]`);
  }

  /**
   * Click the "Switch" link for the Feature Flag account row.
   * Switches the active workspace to that account.
   */
  async switchToFeatureFlagAccount(): Promise<void> {
    await this.featureFlagSwitchLink.click({ timeout: 60000 });
  }

  /**
   * Click the "View" link for the first account row.
   * Navigates to the account members page.
   */
  async clickView(): Promise<void> {
    await this.viewLink.click({ timeout: 60000 });
  }

  /**
   * Click the "MuukTest - Feature Flag Environment" account name link.
   * Navigates to that account's detail/members page.
   */
  async openFeatureFlagAccount(): Promise<void> {
    await this.featureFlagAccountLink.click({ timeout: 60000 });
  }

  /**
   * Click the "MuukTest - Production Environment" account name link.
   * Navigates to that account's detail/members page.
   */
  async openProductionAccount(): Promise<void> {
    await this.productionAccountLink.click({ timeout: 60000 });
  }
}
