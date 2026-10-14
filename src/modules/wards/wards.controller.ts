import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WardsService } from './wards.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { SearchWardRequestDto } from './dto/search-ward-request.dto';

@Controller('wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  @Post()
  create(@Body() createWardDto: CreateWardDto) {
    return this.wardsService.create(createWardDto);
  }

  @Get()
  search(@Query() query: SearchWardRequestDto) {
    return this.wardsService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wardsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWardDto: UpdateWardDto) {
    return this.wardsService.update(id, updateWardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wardsService.remove(id);
  }
}
