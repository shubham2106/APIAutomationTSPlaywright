import {test, expect} from '@playwright/test';
import { urls } from './../../src/resources/urls';
import { UserObject } from './../../src/payloads/generateUserPayload';



test('API Test - Post users', async ({ request }) => {
    const userObject = new UserObject();
    const response = await request.post(`${urls.baseUrl}${urls.createSingleUser}`, {
      data: userObject
    });
    const responseBody = JSON.parse(await response.text());
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toBe(201);
    expect.soft(responseBody.title).toBe(userObject.title);
    expect.soft(responseBody.userId).toBe(userObject.userId);
    expect.soft(responseBody.body).toBe(userObject.body);
  })

test('API Test - Post single user without data', async ({request}) => {
    const response = await request.post(`${urls.baseUrl}${urls.createSingleUser}`, {
        data: ""
    });
    const responseBody = JSON.parse(await response.text());
    expect.soft(response.status()).toBe(201);
    expect.soft(responseBody.id).toBe(101);
    expect.soft(responseBody.userId).toBeUndefined();
    expect.soft(responseBody.title).toBeUndefined();
    expect.soft(responseBody.body).toBeUndefined();
  })
