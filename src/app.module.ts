import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StopModule } from './stop/stop.module';
import { PlaceModule } from './place/place.module';
import { CategoryModule } from './category/category.module';
import { BusModule } from './bus/bus.module';
import { SeatModule } from './seat/seat.module';
import { PassengerModule } from './passenger/passenger.module';
import { TravelModule } from './travel/travel.module';
import { TravelDetailModule } from './travel_detail/travel_detail.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    StopModule,
    PlaceModule,
    CategoryModule,
    BusModule,
    SeatModule,
    PassengerModule,
    TravelModule,
    TravelDetailModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
