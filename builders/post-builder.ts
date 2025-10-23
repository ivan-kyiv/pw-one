export class PostBuilder {
  private post: Record<string, any> = {};

  withUserId(userId: number): PostBuilder {
    this.post.userId = userId;
    return this;
  }

  withId(id: number): PostBuilder {
    this.post.id = id;
    return this;
  }

  withTitle(title: string): PostBuilder {
    this.post.title = title;
    return this;
  }

  withBody(body: string): PostBuilder {
    this.post.body = body;
    return this;
  }

  build(): Record<string, any> {
    return this.post;
  }
}