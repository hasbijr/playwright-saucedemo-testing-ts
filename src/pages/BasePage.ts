import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly cartBadge: Locator;
  readonly burgerButton: Locator;
  readonly logoutLink: Locator;

  constructor(protected page: Page) {
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.burgerButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async getTitle() {
    return await this.page.title();
  }

  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      const count = await this.cartBadge.innerText();
      return parseInt(count);
    }
    return 0;
  }

  async logout() {
    await this.burgerButton.click();
    await this.logoutLink.click();
  }
}
