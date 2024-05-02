import {test, expect, Response, APIResponse} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {urls} from './../../src/resources/urls';
import { UserObject } from '../../src/payloads/generateUserPayload';

test('Update body and title for any post', async ({request}) => {
    const id: number = faker.number.int(10);
    const newId: number = faker.number.int(10)
    const response: APIResponse = await request.put(`${urls.baseUrl}${urls.updateUser}${id}`, {
        data: {
            id: newId,
            title: 'foo',
            body: 'bar',
            userId: newId,
          },
    });
    const responseData = JSON.parse(await response.text());
    await expect.soft(response.status()).toBe(200);
    expect.soft(responseData.body).toBe("bar");
    expect.soft(responseData.title).toBe("foo");
    expect.soft(responseData.id).toBe(id);
    expect.soft(responseData.userId).toBe(newId);
})