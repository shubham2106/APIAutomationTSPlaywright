import {test, expect, Response, APIResponse} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {urls} from './../../src/resources/urls';
import { UserObject } from '../../src/payloads/generateUserPayload';

test('Update body for any post', async ({request}) => {
    const id: number = faker.number.int(10);
    const getResponse: APIResponse = await request.get(`${urls.baseUrl}${urls.getSingleUser}${id}`, {
        data: {
            body: 'bar'
          },
    });
    const patchResponse: APIResponse = await request.patch(`${urls.baseUrl}${urls.updateUser}${id}`, {
        data: {
            body: 'bar'
          },
    });
    const getResponseData = JSON.parse(await getResponse.text());
    const patchResponseData = JSON.parse(await patchResponse.text());
    await expect.soft(patchResponse.status()).toBe(200);
    expect.soft(patchResponseData.body).toBe("bar");
    expect.soft(patchResponseData.title).toBe(getResponseData.title);
    expect.soft(patchResponseData.userId).toBe(getResponseData.userId);
})


test('Try to update id for any post', async ({request}) => {
    const id: number = 0;
    const newId: number = faker.number.int(10);
    const getResponse: APIResponse = await request.get(`${urls.baseUrl}${urls.getSingleUser}${id}`);
    
    const patchResponse: APIResponse = await request.patch(`${urls.baseUrl}${urls.updateUser}${id}`, {
        data: {
            id: newId
          },
    });
    const getResponseData = JSON.parse(await getResponse.text());
    const patchResponseData = JSON.parse(await patchResponse.text());
    await expect.soft(patchResponse.status()).toBe(200);
    expect.soft(patchResponseData.body).toBe(getResponseData.body);
    expect.soft(patchResponseData.title).toBe(getResponseData.title);
    expect.soft(patchResponseData.userId).toBe(getResponseData.userId);
    expect.soft(patchResponseData.id).toBe(newId);
})