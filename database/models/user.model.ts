import {
  BeforeCreate,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

import { Post } from './post.model';

@Table
export class User extends Model<User> {
  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  login: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  avatarPath: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @HasMany(() => Post, {
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await bcrypt.hash(
      user.password,
      Number(process.env.SALT_ROUNDS),
    );
  }
}
