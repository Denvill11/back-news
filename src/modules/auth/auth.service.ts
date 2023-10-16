import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { ErrorMessage } from './constants/errorMessages';
import { LogInUserDTO } from './dto/login-user.dto';

import { User } from '../../../database/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userData: typeof User,
    private jwtService: JwtService,
  ) {}

  async getUserInfo(userId: number) {
    const userInfo = await this.userData.findOne({
      where: { id: userId },
      attributes: ['email', 'login'],
    });
    return userInfo;
  }

  async loginUser(userDto: LogInUserDTO) {
    const user = await this.validateUser(userDto);
    delete user.password;
    const token = await this.generateToken(user.id);
    return { token, user };
  }

  async registrationUser(userDto: CreateUserDto) {
    const candidateEmail = await this.userData.findOne({
      where: { email: userDto.email },
    });

    if (candidateEmail) {
      throw new HttpException(
        ErrorMessage.userExistError,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userData.create(userDto);
    const token = await this.generateToken(user.id);
    return { user, token };
  }

  private generateToken(id: number) {
    return this.jwtService.signAsync({ id });
  }

  private async validateUser(userDto: LogInUserDTO) {
    const user = await this.userData.findOne({
      where: { email: userDto.email },
    });
    if (!user) {
      throw new UnauthorizedException({ message: ErrorMessage.emailError });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({ message: ErrorMessage.passwordError });
    }
    return user;
  }
}
