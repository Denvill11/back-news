import { Controller, Get } from '@nestjs/common';

import { PostService } from './post.service';
import { PostData } from './types/index.t';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  getAllPosts(): Promise<PostData[]> {
    return this.postService.getAllPosts();
  }
}
