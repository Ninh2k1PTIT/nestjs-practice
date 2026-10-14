import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SearchUserRequestDto } from './dto/search-user-request.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<
    Pick<
      Repository<User>,
      'create' | 'save' | 'findOneBy' | 'merge' | 'delete' | 'findAndCount'
    >
  >;
  const user = {
    id: 'a1b2c3d4-0000-4000-8000-000000000001',
    name: 'Ninh',
  } as User;

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      merge: jest.fn(),
      delete: jest.fn(),
      findAndCount: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('tìm thấy bản ghi', async () => {
      repo.findAndCount.mockResolvedValue([[user], 25]);
      const result = await service.search(
        Object.assign(new SearchUserRequestDto(), {
          page: 2,
          size: 10,
          name: 'Ninh',
        }),
      );
      expect(repo.findAndCount).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
        where: {
          name: ILike('%Ninh%'),
          createdAt: undefined,
          updatedAt: undefined,
        },
      });
      expect(result).toEqual({
        items: [user],
        meta: { total: 25, page: 2, size: 10, totalPages: 3 },
      });
    });

    it('không tìm thấy bản ghi', async () => {
      repo.findAndCount.mockResolvedValue([[], 0]);
      const result = await service.search(
        Object.assign(new SearchUserRequestDto(), {
          page: 2,
          size: 10,
          name: 'Ninh123',
        }),
      );

      expect(repo.findAndCount).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
        where: {
          name: ILike('%Ninh123%'),
          createdAt: undefined,
          updatedAt: undefined,
        },
      });
      expect(result).toEqual({
        items: [],
        meta: { total: 0, page: 2, size: 10, totalPages: 0 },
      });
    });
  });

  describe('delete', () => {
    it('xoá 1 bản ghi đã tồn tại', async () => {
      repo.delete.mockResolvedValue({ affected: 1, raw: [] });
      await expect(service.remove(user.id)).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith(user.id);
    });
    it('ném NotFoundException khi id không tồn tại', async () => {
      repo.delete.mockResolvedValue({ affected: 0, raw: [] });

      await expect(service.remove('not-exist-id')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(repo.delete).toHaveBeenCalledWith('not-exist-id');
    });
  });
});
