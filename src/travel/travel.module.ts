import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';
import { Seat } from 'src/seat/entities/seat.entity';
import { TravelDetail } from 'src/travel_detail/entities/travel_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Travel, Seat, TravelDetail])],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
