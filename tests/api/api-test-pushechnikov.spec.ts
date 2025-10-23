import { test, expect } from '@playwright/test';
import { PostsApiController } from '@api/posts-api-controller';
import { PostBuilder } from '@builders/post-builder';

test("API-test from Ivan Pushechnikov for Automation QA (Playwright + TypeScript)", async ({ request }) => {
  const postsApi = new PostsApiController(request);

  // 1. Send GET posts request
  const getResponse = await postsApi.getPosts();

  // 2. Verify response status
  expect(getResponse.status()).toBe(200);

  // 3. Verify not empty posts list
  const posts = await getResponse.json();
  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);

  // 4. Verify feilds in the first post
  const firstPost = posts[0];
  expect(firstPost).toHaveProperty('userId');
  expect(firstPost).toHaveProperty('id');
  expect(firstPost).toHaveProperty('title');
  expect(firstPost).toHaveProperty('body');

  // 5. Send POST create post request
  const postData = new PostBuilder()
    .withTitle('QA Automation Post')
    .withBody('This post was created during Playwright API testing')
    .withUserId(777)
    .build();

  const postResponse = await postsApi.createPost(postData);

  // 6. Verify POST response status
  expect(postResponse.status()).toBe(201);

  // 7. Verify the response body contains the sent data and an id
  const responseData = await postResponse.json();
  expect(responseData).toMatchObject(postData);
  expect(responseData.title).toBe(postData.title);
  expect(responseData.body).toBe(postData.body);
  expect(responseData.userId).toBe(postData.userId);
  expect(responseData).toHaveProperty('id');

  // 8. Send DELETE post request
  const deleteResponse = await postsApi.deletePost('1');

  // 9. Verify DELETE response status
  expect(deleteResponse.status()).toBe(200);
});