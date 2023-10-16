import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  loginUser(@Body() userDto: CreateUserDto) {
    return this.authService.loginUser(userDto);
  }

  @Post('/registration')
  registrationUser(@Body() userDto: CreateUserDto) {
    return this.authService.registrationUser(userDto);
  }
}
