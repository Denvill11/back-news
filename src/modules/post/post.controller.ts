import { Controller, Get } from '@nestjs/common';

import { PostData } from './types/index.d';
import { PostService } from './post.service';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(): Promise<PostData[]> {
    return this.postService.getAllPosts();
  }
}
