import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { Signup } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByUserName(username);
    const isCorrectPassword = await bcrypt.compare(pass, user.password);
    if (user && isCorrectPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(dto: Signup) {
    const exists = await this.usersService.existsByUserName(dto.username);
    if (exists) {
      throw new ConflictException();
    }

    const hash = await this.usersService.hashPassword(dto.password);

    const user = this.usersService.createWithPassword({
      ...dto,
      password: hash,
    });

    return user;
  }
}
