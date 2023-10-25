import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../guards/jwt-auth.guard';

import { UserService } from './user.service';
import { GetUserInfoType } from './types';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUserInfo(@Param('id', ParseIntPipe) id: number): Promise<GetUserInfoType> {
    return this.userService.getUserInfo(id);
  }
}
