import { Page, Locator } from '@playwright/test';

/**
 * EditAccountPage
 * The account edit form at `/accounts/[accountId]/edit`.
 * Covers: test4 (TC_A84087+), test5 (TC_A84151, TC_A84152+).
 *
 * Muuk origins:
 *   dashboardStagingNavgp0y1vwxva1e8  (Edit Account form — test4)
 *   dashboardStagingNavgkoyr3hqnctqq  (Edit Account form — test5)
 *   dashboardStagingNavguciflemiatuk  (Success/confirmation state — test5)
 */
export class EditAccountPage {
  readonly page: Page;

  // ── Form labels (visibility assertions) ─────────────────────────────────
  /** "Account Name" field label. */
  readonly accountNameLabel: Locator;

  /** "Default language" field label. */
  readonly defaultLanguageLabel: Locator;

  /** "Friendly code" field label. */
  readonly friendlyCodeLabel: Locator;

  // ── Form fields ──────────────────────────────────────────────────────────
  /**
   * Default language SELECT element.
   * `selectOption('es')` → Spanish, `selectOption('en')` → English.
   */
  readonly defaultLanguageSelect: Locator;

  /**
   * Account avatar image — visible on the account detail page before editing.
   * Used by test4/test5 to verify the avatar is displayed.
   */
  readonly accountAvatarImage: Locator;

  /**
   * Avatar file upload input (test5 — account avatar upload).
   */
  readonly accountAvatarFileInput: Locator;

  // ── Form submit buttons ──────────────────────────────────────────────────
  /**
   * "Update Account" submit button (English UI).
   * Used by test4 and test5.
   */
  readonly updateAccountButton: Locator;

  /**
   * "Actualizar Cuenta" submit button (Spanish UI — appears after switching language to ES).
   * Used by test5 (TC_A84151) to save after language switch.
   */
  readonly actualizarCuentaButton: Locator;

  // ── Edit Account links (on the account detail/view page) ─────────────────
  /**
   * "Edit Account" link (English) on the account detail page.
   * Navigates to the edit form.
   */
  readonly editAccountLinkEn: Locator;

  /**
   * "Editar cuenta" link (Spanish) — appears after switching to ES.
   * Navigates back to the edit form in the Spanish UI.
   */
  readonly editAccountLinkEs: Locator;

  // ── Success / confirmation messages ──────────────────────────────────────
  /**
   * "Account was successfully updated." success toast (English).
   * Used by test5 to assert the Update Account button worked.
   */
  readonly successToastEn: Locator;

  /**
   * "Cuenta actualizada exitosamente." success toast (Spanish).
   * Used by test5 to assert the Actualizar Cuenta button worked.
   */
  readonly successToastEs: Locator;

  // ── Delete ────────────────────────────────────────────────────────────────
  /**
   * "Delete" link on the Edit Account page.
   * Opens the delete confirmation.
   */
  readonly deleteLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form labels
    this.accountNameLabel     = page.locator(`//LABEL[normalize-space() = "Account Name"]`);
    this.defaultLanguageLabel = page.locator(`//LABEL[normalize-space() = "Default language"]`);
    this.friendlyCodeLabel    = page.locator(`//LABEL[normalize-space() = "Friendly code"]`);

    // Form fields
    this.defaultLanguageSelect  = page.locator(`SELECT[name='account[default_language]'][id='account_default_language']`);
    this.accountAvatarImage     = page.locator(`//label[@for='account_avatar']/following-sibling::div//img`);
    this.accountAvatarFileInput = page.locator(`INPUT[type='file'][name='account[avatar]'][id='account_avatar']`);

    // Submit buttons
    this.updateAccountButton  = page.locator(
      `//BUTTON[@name='button'][@type='submit'][normalize-space() = "Update Account"]`
    );
    this.actualizarCuentaButton = page.locator(
      `//BUTTON[@name='button'][@type='submit'][normalize-space() = "Actualizar Cuenta"]`
    );

    // Edit Account links (on account detail page — two different Muuk classes)
    this.editAccountLinkEn = page.locator(`//A[normalize-space() = "Edit Account"]`);
    this.editAccountLinkEs = page.locator(`//A[normalize-space() = "Editar cuenta"]`);

    // Success toasts
    this.successToastEn = page.locator(`//P[normalize-space() = "Account was successfully updated."]`);
    this.successToastEs = page.locator(`//P[normalize-space() = "Cuenta actualizada exitosamente."]`);

    // Delete
    this.deleteLink = page.locator(`//A[normalize-space() = "Delete"]`);
  }

  /**
   * Select a language from the Default Language dropdown and save.
   * @param languageCode e.g. 'es' (Spanish) or 'en' (English)
   */
  async selectLanguageAndSave(languageCode: string): Promise<void> {
    await this.defaultLanguageSelect.selectOption(languageCode);
    if (languageCode === 'es') {
      // After setting language to Spanish, the button label changes to "Actualizar Cuenta"
      await this.updateAccountButton.click({ timeout: 60000 });
    } else {
      // Restoring to English — button may show Spanish label if we're already in ES UI
      await this.actualizarCuentaButton.click({ timeout: 60000 });
    }
  }

  /**
   * Click "Update Account" (English submit button).
   */
  async clickUpdateAccount(): Promise<void> {
    await this.updateAccountButton.click({ timeout: 60000 });
  }

  /**
   * Click "Actualizar Cuenta" (Spanish submit button).
   */
  async clickActualizarCuenta(): Promise<void> {
    await this.actualizarCuentaButton.click({ timeout: 60000 });
  }
}
