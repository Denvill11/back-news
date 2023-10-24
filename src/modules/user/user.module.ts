import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from '../../../database/models/user.model';
import { Post } from '../../../database/models/post.model';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtModule],
  imports: [SequelizeModule.forFeature([Post, User]), JwtModule],
})
export class UserModule {}
