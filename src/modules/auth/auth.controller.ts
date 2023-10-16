import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from './guards/jwt-auth.guard';
import { LogInUserDTO } from './dto/login-user.dto';
import { WhoamiDTO } from './dto/whoami-user.dto';
import { RegistrationData } from './types';

import { User } from '../../../database/models/user.model';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  loginUser(@Body() userDto: LogInUserDTO): Promise<RegistrationData> {
    return this.authService.loginUser(userDto);
  }

  @Post('/registration')
  registrationUser(@Body() userDto: CreateUserDto): Promise<RegistrationData> {
    return this.authService.registrationUser(userDto);
  }

  @UseGuards(AuthGuard)
  @Get('/whoami')
  getUserInfo(@Request() req: WhoamiDTO): Promise<User> {
    return this.authService.getUserInfo(req.user.id);
  }
}
