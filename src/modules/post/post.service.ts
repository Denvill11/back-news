import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from '../../../database/models/post.model';
import { User } from '../../../database/models/user.model';
import { Tag } from '../../../database/models/tag.model';
import { PostData } from './types';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postsInfo: typeof Post,
    @InjectModel(User) private userInfo: typeof User,
    @InjectModel(Tag) private tagInfo: typeof Tag,
  ) {}

  async getAllPosts(): Promise<PostData[]> {
    const posts = await this.postsInfo.findAll({
      include: [
        { model: this.userInfo, attributes: ['id', 'login'] },
        {
          model: this.tagInfo,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
    return posts;
  }
}
