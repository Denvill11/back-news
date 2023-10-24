import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from '../../../database/models/post.model';
import { Tag } from '../../../database/models/tag.model';
import { User } from '../../../database/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userInfo: typeof User) {}

  async getUserInfo(id: number) {
    try {
      const user = await this.userInfo.findOne({
        where: { id },
        attributes: ['email', 'login', 'avatarPath'],
        include: [
          {
            model: Post,
            include: [
              {
                model: Tag,
                through: { attributes: [] },
              },
            ],
          },
        ],
      });
      return user;
    } catch (error) {
      return error.message;
    }
  }
}
