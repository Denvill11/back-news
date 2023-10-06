import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from 'database/models/post.model';

@Injectable()
export class AppService {
  constructor(@InjectModel(Post) private news: typeof Post) {}
  async getAllTasks() {
    const posts = await this.news.findAll({});
    return posts;
  }
}
