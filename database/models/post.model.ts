import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { Model } from 'sequelize/types/model';
import { User } from './user.model';

export interface ASD {
  title: string;
  info: string;
  autorId: number;
  imagePath: string;
}

@Table
export class Post extends Model<Post, ASD> {
  @Column
  id: number;

  @Column
  title: string;

  @Column
  info: string;

  @ForeignKey(() => User)
  @Column
  autorId: number;

  @Column
  imagePath: string;

  @BelongsTo(() => User)
  user: User;
}
