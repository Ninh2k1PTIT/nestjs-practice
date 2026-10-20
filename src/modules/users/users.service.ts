import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service/base.service';
import { ILike, QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserRequestDto } from './dto/search-user-request.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private config: ConfigService,
  ) {
    super(usersRepository);
  }

  search(query: SearchUserRequestDto) {
    const keyword = query.keyword ? ILike(`%${query.keyword}%`) : undefined;
    return this.paging(query, {
      where: keyword ? [{ firstName: keyword }, { lastName: keyword }] : {},
    });
  }

  async findOneByUserName(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  existsByUserName(username: string) {
    return this.usersRepository.existsBy({
      username,
    });
  }

  async create(dto: CreateUserDto) {
    const defaultPassword = this.config.getOrThrow<string>(
      'DEFAULT_USER_PASSWORD',
    );
    return this.createWithPassword({
      ...dto,
      password: await this.hashPassword(defaultPassword),
    });
  }

  async createWithPassword(dto: CreateUserDto & { password: string }) {
    try {
      return await this.usersRepository.save(this.usersRepository.create(dto));
    } catch (e) {
      if (
        e instanceof QueryFailedError &&
        (e.driverError as any)?.code === '23505'
      ) {
        throw new ConflictException('Username đã tồn tại');
      }
      throw e;
    }
  }

  hashPassword(raw: string) {
    return bcrypt.hash(
      raw,
      Number(this.config.get('BCRYPT_SALT_ROUNDS') ?? 10),
    );
  }
}
