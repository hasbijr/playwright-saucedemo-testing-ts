import { createBdd } from 'playwright-bdd';
import { expect, APIResponse } from '@playwright/test';
import { test } from '../fixtures/fixtures';

const { Given, Then } = createBdd(test);

let apiResponse: APIResponse;

Given('I send a GET request to {string}', async ({ request }, url) => {
  apiResponse = await request.get(url);
});

Given('I send a PUT request to {string} with title {string}', async ({ request }, url, title) => {
  apiResponse = await request.put(url, {
    data: {
      title,
      userId: 1
    }
  });
});

Given('I send a DELETE request to {string}', async ({ request }, url) => {
  apiResponse = await request.delete(url);
});

Given('I send a POST request to {string} with title {string} and body {string}', async ({ request }, url, title, body) => {
  apiResponse = await request.post(url, {
    data: {
      title,
      body,
      userId: 1
    }
  });
});

Then('the response status should be {int}', async ({}, status) => {
  expect(apiResponse.status()).toBe(status);
});

Then('the response body should contain title {string}', async ({}, title) => {
  const json = await apiResponse.json();
  expect(json.title).toBe(title);
});

Then('the response body should contain the sent title and body', async ({}) => {
  const json = await apiResponse.json();
  expect(json.title).toBe('foo');
  expect(json.body).toBe('bar');
});

Then('the response body should contain id {int}', async ({}, id) => {
    const json = await apiResponse.json();
    expect(json.id).toBe(id);
});
