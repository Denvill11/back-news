import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { errorMessage } from '../constants/errorMessages';

export class LogInUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly email?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: errorMessage.SMALL_PASSWORD })
  @Transform(({ value }) => value.trim())
  readonly password?: string;
}
