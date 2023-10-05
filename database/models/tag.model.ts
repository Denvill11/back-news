import { Post } from './post.model';
import {
  Column,
  HasMany,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';

@Table
export class Tag extends Model {
  @ForeignKey(() => Post)
  @Column({ allowNull: false })
  name: string;

  @HasMany(() => Post)
  posts: Post[];
}
