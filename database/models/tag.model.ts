import { Column, Table, Model, BelongsToMany } from 'sequelize-typescript';

import { Post } from './post.model';
import { TagPost } from './tagPost.model';

@Table
export class Tag extends Model {
  @Column({ allowNull: true, unique: true })
  name: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @BelongsToMany(() => Post, () => TagPost)
  through: { attributes: [] };
  posts: Post[];
}
