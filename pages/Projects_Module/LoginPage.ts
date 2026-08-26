import { Page } from '@playwright/test';

/**
 * LoginPage
 * Handles the Navgar staging login flow.
 */
export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(baseUrl: string) {
    await this.page.goto(baseUrl, { timeout: 20000 });
  }

  async login(email: string, password: string) {
    // Click the "Log In" link on the landing page
    await this.page.locator('//a[contains(text(),"Log In")]').click({ timeout: 60000 });

    // Fill email
    await this.page.locator('INPUT[type="email"][name="user[email]"][id="user_email"]').fill(email);

    // Fill password
    await this.page.locator('INPUT[type="password"][name="user[password]"][id="user_password"]').fill(password);

    // Submit
    await this.page.locator('INPUT[type="submit"][name="commit"]').click({ timeout: 60000 });

    // Dismiss command bar / overlay that appears after login
    //await this.page.keyboard.press('Escape');
  }
}
