import { User } from '../../../../database/models/user.model';

export interface RegistrationData {
  user: User;
  token: string;
}
