import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../../../database/models/user.model';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [SequelizeModule.forFeature([User])],
})
export class AuthModule {}
