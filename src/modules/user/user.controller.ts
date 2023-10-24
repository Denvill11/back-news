import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../guards/jwt-auth.guard';

import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserInfo(id);
  }
}
