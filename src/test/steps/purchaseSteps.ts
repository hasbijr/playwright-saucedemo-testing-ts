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

When('I add {string} to the cart', async ({ inventoryPage, cartState }, productName: string) => {
  const price = await inventoryPage.getPriceByName(productName);
  
  await inventoryPage.addItemByName(productName);
  cartState.addedItems.push({ name: productName, price });
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
  
  // 1. Calculate Expected Subtotal (Sum of added items from state)
  const expectedSubtotal = cartState.addedItems.reduce((sum, item) => sum + item.price, 0);
  
  // 2. Delegate Tax Calculation to Page Object ("The Right File")
  const expectedTax = checkoutOverviewPage.calculateExpectedTax(expectedSubtotal);
  
  // 3. Calculate Expected Total
  const expectedTotal = expectedSubtotal + expectedTax;
  
  // Compare calculated formula results against the results from the screen
  expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
  expect(tax).toBeCloseTo(expectedTax, 2);
  expect(total).toBeCloseTo(expectedTotal, 2);
});

When('I click the finish button', async ({ checkoutOverviewPage }) => {
  await checkoutOverviewPage.clickFinish();
});

Then('I should see {string} success message', async ({ checkoutCompletePage }, message) => {
  const successMessage = await checkoutCompletePage.getSuccessMessage();
  expect(successMessage).toBe(message);
});
