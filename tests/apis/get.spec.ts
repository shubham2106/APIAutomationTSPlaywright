import {test, expect} from '@playwright/test';
import { urls } from '../../src/resources/urls';
import {faker} from '@faker-js/faker';

test('API Test - Get single users', async ({request}) => {
    const randomId = faker.number.int(100);
    const response = await request.get(`${urls.baseUrl}${urls.getSingleUser}${randomId}`);

    const responseBody = JSON.parse(await response.text());
    expect.soft(response.status()).toBe(200);
    expect.soft(responseBody.title).toBeTruthy();   // toBetruthy will check if the title is not null.
    expect.soft(responseBody.body).toBeTruthy();    // toBetruthy will check if the body is not null.
    expect.soft(responseBody.id).toBe(randomId);
})

test('API Test - Get single users for id = 0', async ({request}) => {
    const response = await request.get(`${urls.baseUrl}${urls.getSingleUser}0`);

    const responseBody = JSON.parse(await response.text());
    expect.soft(response.status()).toBe(404);   
})

test('API Test - Get All users', async ({request}) => {
    const response = await request.get(`${urls.baseUrl}${urls.getAllUser}`);

    const responseBody = JSON.parse(await response.text());
    expect.soft(response.status()).toBe(200);
    expect.soft(responseBody.length).toBe(100);
})

test('API Test - Get comments of specific post', async ({request}) => {
    const randomId = faker.number.int(100);
    const response = await request.get(`${urls.baseUrl}/posts/${randomId}/comments`);

    const responseBody = JSON.parse(await response.text());
    expect.soft(response.status()).toBe(200);
    responseBody.forEach(element => {
        expect.soft(element.postId).toBe(randomId);
        expect.soft(element.email).toBeDefined();
        expect.soft(element.email).toBeDefined();
    });
})

test('API Test - Get comments for any post with postid', async ({request}) => {
    const randomId = faker.number.int(100);
    const response = await request.get(`${urls.baseUrl}${urls.comment}postId=${randomId}`);

    const responseBody = JSON.parse(await response.text());
    expect.soft(response.status()).toBe(200);
    responseBody.forEach(element => {
        expect.soft(element.postId).toBe(randomId);
        expect.soft(element.email).toBeDefined();
        expect.soft(element.email).toBeDefined();
    });
})
