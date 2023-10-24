import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from '../../../database/models/post.model';
import { Tag } from '../../../database/models/tag.model';
import { User } from '../../../database/models/user.model';

import { errorMessages } from '../auth/constants/errorMessages';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userInfo: typeof User) {}

  async getUserInfo(id: number) {
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
    if (user === null) {
      throw new HttpException(
        errorMessages.USER_DOES_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return user;
    }
  }
}
