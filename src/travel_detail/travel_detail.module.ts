import { Module } from '@nestjs/common';
import { TravelDetailService } from './travel_detail.service';
import { TravelDetailController } from './travel_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelDetail } from './entities/travel_detail.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TravelDetail])],
  controllers: [TravelDetailController],
  providers: [TravelDetailService],
})
export class TravelDetailModule {}
