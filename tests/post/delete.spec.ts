import {test, expect, APIRequest, APIResponse} from '@playwright/test';
import {faker} from '@faker-js/faker';
import { urls } from '../../src/resources/urls';

test('Delete any post', async ({request}) => {
    const id: number = faker.number.int(10);
    const response: APIResponse = await request.delete(`${urls.baseUrl}${urls.delete}${id}`)
    const responseData = JSON.parse(await response.text());
    expect.soft(response.status()).toBe(200);
})