export interface TokenType {
  id: number;
  iat: number;
  exp: number;
}

export interface GetUserInfoType {
  email: string;
  login: string;
  avatarPath: string;
  posts: PostData[];
}
