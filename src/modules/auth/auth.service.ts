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
import { User } from '../../../database/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userData: typeof User,
    private jwtService: JwtService,
  ) {}

  async loginUser(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registrationUser(userDto: CreateUserDto) {
    const candidateEmail = await this.userData.findOne({
      where: { email: userDto.email },
    });

    if (candidateEmail) {
      throw new HttpException(
        'A user with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const candidateLogin = await this.userData.findOne({
      where: { login: userDto.login },
    });

    if (candidateLogin) {
      throw new HttpException(
        'A user with this login already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userData.create(userDto);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userData.findOne({
      where: { email: userDto.email },
    });
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
