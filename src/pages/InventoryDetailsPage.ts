import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryDetailsPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async getProductName() {
    return await this.productName.innerText();
  }

  async getProductPrice() {
    const priceText = await this.productPrice.innerText();
    return parseFloat(priceText.replace('$', ''));
  }
}
