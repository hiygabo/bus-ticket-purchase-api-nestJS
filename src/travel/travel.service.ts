import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private travelRepository: Repository<Travel>,
  ) {}

  async create(createTravelDto: CreateTravelDto) {
    const newTravel = this.travelRepository.create({
      departure_date: createTravelDto.departure_date,
      route: createTravelDto.route,
      bus: { id_bus: createTravelDto.id_bus },
      travel_origin: { id_stop: createTravelDto.id_origin_stop },
      travel_destiny: { id_stop: createTravelDto.id_destiny_stop },
      schedule: { id_schedule: createTravelDto.id_schedule },
    });

    return await this.travelRepository.save(newTravel);
  }

  async findAllTravels() {
    return this.travelRepository.find({
      relations: {
        bus: true,
        travel_origin: true,
        travel_destiny: true,
        schedule: true,
      },
    });
  }
}
