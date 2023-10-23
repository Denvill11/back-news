import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from 'database/models/post.model';
import { User } from 'database/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userInfo: typeof User) {}

  async getUserInfo(id: number) {
    const user = await this.userInfo.findOne({
      where: { id },
      attributes: ['email', 'login', 'avatarPath'],
      include: [{ model: Post }],
    });
    return user;
  }
}
