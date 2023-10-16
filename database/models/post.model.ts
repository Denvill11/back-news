import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';

import { User } from './user.model';
import { Tag } from './tag.model';
import { TagPost } from './tagPost.model';

@Table
export class Post extends Model {
  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  info: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  authorId: number;

  @Column
  imagePath: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @BelongsToMany(() => Tag, () => TagPost)
  tags: Tag[];
}
