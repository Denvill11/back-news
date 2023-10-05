import { Post } from './post.model';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  id: number;

  @Column
  email: string;

  @Column
  login: string;

  @Column
  password: string;

  @Column
  avatarPath: string;

  @HasMany(() => Post, {
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
