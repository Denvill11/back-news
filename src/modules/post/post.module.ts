import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from '../../../database/models/post.model';
import { User } from '../../../database/models/user.model';
import { Tag } from '../../../database/models/tag.model';

import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [SequelizeModule.forFeature([Post, User, Tag])],
})
export class PostModule {}
