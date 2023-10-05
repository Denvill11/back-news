import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../database/models/post.js';
import { Tag } from '../database/models/tag.js';
import { TagPost } from '../database/models/tagpost.js';
import { User } from '../database/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
