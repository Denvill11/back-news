import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Tag } from './tag.model';
import { Post } from './post.model';

@Table
export class TagPost extends Model {
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @Column({ allowNull: false })
  createdAt?: Date;

  @Column({ allowNull: false })
  updatedAt?: Date;
}
