import { Module } from '@nestjs/common';
import { StopService } from './stop.service';
import { StopController } from './stop.controller';
import { Stop } from './entities/stop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Stop])],
  controllers: [StopController],
  providers: [StopService],
})
export class StopModule {}
