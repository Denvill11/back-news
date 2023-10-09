export interface PostData {
  id?: number;
  title: string;
  info: string;
  authorId: number;
  imagePath: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: {
    id?: number;
    login: string;
  };
}
