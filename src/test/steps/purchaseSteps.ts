import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

const { When, Then } = createBdd(test);

When('I sort products by {string}', async ({ inventoryPage }, option) => {
  await inventoryPage.sortBy(option);
});

Then('the first item price should be higher than the second', async ({ inventoryPage }) => {
  const firstPrice = await inventoryPage.getItemPrice(0);
  const secondPrice = await inventoryPage.getItemPrice(1);
  expect(firstPrice).toBeGreaterThanOrEqual(secondPrice);
});

When('I add the {string} product to the cart', async ({ inventoryPage, cartState }, position: string) => {
  const index = position === 'first' ? 0 : 1; // Simplification for demo
  const name = await inventoryPage.getItemName(index);
  const price = await inventoryPage.getItemPrice(index);
  
  await inventoryPage.addItemToCart(index);
  cartState.addedItems.push({ name, price });
});

When('I navigate to the cart page', async ({ page }) => {
  await page.goto('/cart.html');
});

When('I click on the checkout button', async ({ cartPage }) => {
  await cartPage.clickCheckout();
});

When('I fill in checkout information with {string} {string} {string}', async ({ checkoutPage }, first, last, zip) => {
  await checkoutPage.fillInformation(first, last, zip);
});

Then('I should see the checkout overview', async ({ page }) => {
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
});

Then('the total price should be correctly calculated with tax', async ({ checkoutOverviewPage, cartState }) => {
  const { subtotal, tax, total } = await checkoutOverviewPage.getPriceDetails();
  
  // Dynamic Calculation: Sum of items stored in cartState
  const expectedSubtotal = cartState.addedItems.reduce((sum, item) => sum + item.price, 0);
  
  expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
  expect(total).toBeCloseTo(subtotal + tax, 2);
});

When('I click the finish button', async ({ checkoutOverviewPage }) => {
  await checkoutOverviewPage.clickFinish();
});

Then('I should see {string} success message', async ({ checkoutCompletePage }, message) => {
  const successMessage = await checkoutCompletePage.getSuccessMessage();
  expect(successMessage).toBe(message);
});
