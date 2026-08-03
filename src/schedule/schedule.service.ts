import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async createSchedule(createScheduleDto: CreateScheduleDto) {
    const newSchedule = this.scheduleRepository.create(createScheduleDto);
    return this.scheduleRepository.save(newSchedule);
  }

  async findAllSchedules() {
    return this.scheduleRepository.find();
  }
}
