import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Tag } from './tag.model';

@Table
export class Post extends Model {
  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  info: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  autorId: number;

  @Column
  imagePath: string;

  @Column({ allowNull: false })
  createdAt?: Date;

  @Column({ allowNull: false })
  updatedAt?: Date;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Tag)
  tags: Tag[];
}
