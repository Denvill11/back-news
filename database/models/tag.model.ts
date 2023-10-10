import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';

import { Post } from './post.model';
import { TagPost } from './tagPost';

@Table
export class Tag extends Model {
  @ForeignKey(() => Post)
  @Column({ allowNull: true })
  name: string;

  @Column({ allowNull: false })
  createdAt?: Date;

  @Column({ allowNull: false })
  updatedAt?: Date;

  @BelongsToMany(() => Post, () => TagPost)
  through: { attributes: [] };
  posts: Post[];
}
