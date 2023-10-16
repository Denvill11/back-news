import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly email?: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly login?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Transform(({ value }) => value.trim())
  readonly password?: string;
}
