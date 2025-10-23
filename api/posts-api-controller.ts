import { APIRequestContext, APIResponse } from "@playwright/test";

export class PostsApiController {
  constructor(private request: APIRequestContext, private baseUrl: string = 'https://jsonplaceholder.typicode.com/') {}

  async getPosts(): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}posts`);
  }

  async createPost(postData: Record<string, any>): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}posts`, { data: postData });
  }

  async deletePost(id: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}posts/${id}`);
  }
}