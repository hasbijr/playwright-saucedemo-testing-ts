import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

const { When, Then } = createBdd(test);

When('I logout from the application', async ({ inventoryPage }) => {
  await inventoryPage.logout();
});

Then('I should be redirected to the login page', async ({ page }) => {
  // SauceDemo login page is just the root URL
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
