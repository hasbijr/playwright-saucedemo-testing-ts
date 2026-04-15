import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import testData from '../data/testData.json';

const { Given, When, Then } = createBdd(test);

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.navigate('/');
});

When('I login as {string}', async ({ loginPage }, userType: string) => {
  const user = (testData as any)[userType];
  if (!user) {
    throw new Error(`User profile "${userType}" not found in testData.json`);
  }
  await loginPage.login(user.username, user.password);
});

Then('I should be redirected to the inventory page', async ({ page }) => {
  await expect(page).toHaveURL(/.*inventory.html/);
});

Then('I should see {string} header', async ({ inventoryPage }, headerText) => {
  const text = await inventoryPage.getHeaderText();
  expect(text).toBe(headerText);
});

Then('I should see an error message', async ({ loginPage }) => {
  await expect(loginPage.errorMessage).toBeVisible();
});
