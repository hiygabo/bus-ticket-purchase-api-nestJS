import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StopModule } from './stop/stop.module';
import { PlaceModule } from './place/place.module';
import { CategoryModule } from './category/category.module';
import { BusModule } from './bus/bus.module';
import { SeatModule } from './seat/seat.module';
import { PassengerModule } from './passenger/passenger.module';
import { TravelModule } from './travel/travel.module';
import { TravelDetailModule } from './travel_detail/travel_detail.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
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
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
