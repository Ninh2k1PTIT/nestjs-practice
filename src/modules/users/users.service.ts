import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service/base.service';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    super(usersRepository);
  }

  search(query: SearchUserDto) {
    return this.paging(query, {
      where: query.keyword ? { name: ILike(`%${query.keyword}%`) } : {},
    });
  }
}
