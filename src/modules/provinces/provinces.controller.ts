import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { SearchProvinceDto } from './dto/search-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  create(@Body() createProvinceDto: CreateProvinceDto) {
    return this.provincesService.create(createProvinceDto);
  }

  @Get()
  search(@Query() query: SearchProvinceDto) {
    return this.provincesService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.provincesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.provincesService.update(id, updateProvinceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.provincesService.remove(id);
  }
}
