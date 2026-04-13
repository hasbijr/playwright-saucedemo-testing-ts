import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly headerTitle: Locator;
  readonly productSort: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator('.title');
    this.productSort = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async getHeaderText() {
    return await this.headerTitle.innerText();
  }

  async sortBy(option: string) {
    await this.productSort.selectOption({ label: option });
  }

  async addItemToCart(index: number = 0) {
    await this.inventoryItems.nth(index).locator('button').click();
  }

  async getFirstItemPrice() {
    const priceText = await this.inventoryItems.first().locator('.inventory_item_price').innerText();
    return parseFloat(priceText.replace('$', ''));
  }
}
