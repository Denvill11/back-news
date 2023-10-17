import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../../../database/models/user.model';

import { CreateUserDto } from './dto/create-user.dto';
import { errorMessage } from './constants/errorMessages';
import { LogInUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userData: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(id: number) {
    return this.jwtService.signAsync({ id });
  }

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
        errorMessage.USER_EXIST_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userData.create(userDto);
    const token = await this.generateToken(user.id);
    delete user.password;
    return { user, token };
  }

  private async validateUser(userDto: LogInUserDTO) {
    const user = await this.userData.findOne({
      where: { email: userDto.email },
    });
    if (!user) {
      throw new UnauthorizedException({ message: errorMessage.EMAIL_ERROR });
    }
    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordEquals) {
      throw new UnauthorizedException({ message: errorMessage.PASSWORD_ERROR });
    }
    return user;
  }
}
