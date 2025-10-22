import { expect, type Locator, type Page } from "@playwright/test";

export class TodomvcPage {
  readonly page: Page;
  readonly createTodoInput: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createTodoInput = page.locator('.new-todo');
    this.todoItems = page.locator("[data-testid='todo-title']");
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async createTodo(todoText: string) {
    await this.createTodoInput.fill(todoText);
    await this.createTodoInput.press('Enter');
  }

  async getTodoItem(todoText: string): Promise<Locator> {
    return this.todoItems.filter({ hasText: todoText });
  }

  async verifyTodoExists(todoText: string) {
    const todoItem = await this.getTodoItem(todoText);
    await todoItem.waitFor();
  }

  async toggleTodoCompletion(todoText: string) {
    const todoItem = await this.getTodoItem(todoText);
    const toggle = todoItem.locator('xpath=..').locator('.toggle');
    await toggle.click();
  }

  async verifyTodoCompleted(todoText: string) {
    const todoItem = await this.getTodoItem(todoText);
    const parent = todoItem.locator('xpath=../..');
    await expect(parent).toHaveClass(/completed/);
  }

  async deleteTodo(todoText: string) {
    const todoItem = await this.getTodoItem(todoText);
    const parent = todoItem.locator('xpath=..');
    const deleteButton = parent.locator('.destroy');
    await parent.hover();
    await deleteButton.click();
  }

  async verifyItemNumber(expectedNumber: number) {
    await expect(this.todoItems).toHaveCount(expectedNumber);
  }
}