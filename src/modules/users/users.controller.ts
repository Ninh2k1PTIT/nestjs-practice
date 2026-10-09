import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginatedUserResponse } from './dto/paginated-user-response.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @ApiCreatedResponse({ description: 'Tạo thành công', type: User })
  @ApiBadRequestResponse({ description: 'Dữ liệu gửi lên không hợp lệ' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Tìm kiếm người dùng',
    description: 'Hỗ trợ phân trang và lọc theo keyword',
  })
  @ApiOkResponse({
    description: 'Danh sách người dùng theo trang',
    type: PaginatedUserResponse,
  })
  @ApiBadRequestResponse({ description: 'Tham số phân trang không hợp lệ' })
  search(@Query() query: SearchUserDto) {
    return this.usersService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo id' })
  @ApiParam({ name: 'id', description: 'UUID của người dùng', format: 'uuid' })
  @ApiOkResponse({ description: 'Thông tin người dùng', type: User })
  @ApiBadRequestResponse({ description: 'id không phải UUID hợp lệ' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy người dùng' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiParam({ name: 'id', description: 'UUID của người dùng', format: 'uuid' })
  @ApiOkResponse({ description: 'Người dùng sau khi cập nhật', type: User })
  @ApiBadRequestResponse({
    description: 'id hoặc dữ liệu gửi lên không hợp lệ',
  })
  @ApiNotFoundResponse({ description: 'Không tìm thấy người dùng' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xoá người dùng' })
  @ApiParam({ name: 'id', description: 'UUID của người dùng', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Xoá thành công' })
  @ApiBadRequestResponse({ description: 'id không phải UUID hợp lệ' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy người dùng' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
