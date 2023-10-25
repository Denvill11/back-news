import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../database/models/user.model';
import { Post } from '../database/models/post.model';
import { Tag } from '../database/models/tag.model';
import { TagPost } from '../database/models/tagPost.model';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CustomJwtModule } from './modules/custom-jwt/custom-jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [Post, Tag, User, TagPost],
    }),
    PostModule,
    AuthModule,
    UserModule,
    CustomJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
