import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnakeNamingStrategy } from './common/database/snake-naming.strategy';
import { LoggingInterceptor } from './interceptors/logging/logging.interceptor';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { RequestLogsModule } from './modules/request-logs/request-logs.module';
import { UsersModule } from './modules/users/users.module';
import { WardsModule } from './modules/wards/wards.module';

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
    RequestLogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
