import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  controllers: [ProvincesController],
  providers: [ProvincesService],
})
export class ProvincesModule {}
