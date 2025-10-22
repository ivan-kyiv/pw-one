import { test } from '@playwright/test';
import { TodomvcPage } from 'pages/todomvc-page';

test('UI-test from Ivan Pushechnikov for Automation QA (Playwright + TypeScript)', async ({ page }) => {
  const todomvcPage = new TodomvcPage(page);
  const todoText = 'Buy milk';
  await todomvcPage.goto();
  await todomvcPage.createTodo(todoText);
  await todomvcPage.verifyTodoExists(todoText);
  await todomvcPage.toggleTodoCompletion(todoText);
  await todomvcPage.verifyTodoCompleted(todoText);
  await todomvcPage.deleteTodo(todoText);
  await todomvcPage.verifyItemNumber(0);
});