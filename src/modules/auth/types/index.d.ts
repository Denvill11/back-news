import { User } from '../../../../database/models/user.model';

export interface TokenType {
  id: number;
  iat: number;
  exp: number;
}
export interface RegistrationData {
  user: User;
  token: string;
}
