import {
  BeforeCreate,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Post } from './post.model';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  login: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  avatarPath: string;

  @HasMany(() => Post, {
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, process.env.SALT);
  }
}
