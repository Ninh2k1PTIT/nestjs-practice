import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { UsersModule } from './modules/users/users.module';
import { WardsModule } from './modules/wards/wards.module';
import { SnakeNamingStrategy } from './common/database/snake-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UsersModule,
    ProvincesModule,
    WardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
