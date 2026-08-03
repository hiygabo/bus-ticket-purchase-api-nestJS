import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stop } from './entities/stop.entity';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';

@Injectable()
export class StopService {
  constructor(
    @InjectRepository(Stop)
    private readonly stopRepository: Repository<Stop>,
  ) {}

  async createStop(createStopDto: CreateStopDto): Promise<Stop> {
    const stop = this.stopRepository.create({
      stop_name: createStopDto.name,
      location: {
        type: 'Point',
        coordinates: [createStopDto.longitude, createStopDto.latitude],
      },
      place: { id_place: createStopDto.placeId },
    });
    return this.stopRepository.save(stop);
  }

  async findAllStops(): Promise<Stop[]> {
    return this.stopRepository.find({
      relations: { place: true },
    });
  }

  async findOneStop(id: number): Promise<Stop> {
    const stop = await this.stopRepository.findOne({
      where: { id_stop: id },
      relations: { place: true },
    });

    if (!stop) {
      throw new NotFoundException(`Stop with ID ${id} not found`);
    }
    return stop;
  }
  async updateStop(id: number, updateStopDto: UpdateStopDto): Promise<Stop> {
    const updateData: any = {};
    if (updateStopDto.name) {
      updateData.stop_name = updateStopDto.name;
    }
    if (updateStopDto.placeId) {
      updateData.place = { id_place: updateStopDto.placeId };
    }
    if (updateStopDto.latitude && updateStopDto.longitude) {
      updateData.location = {
        type: 'Point',
        coordinates: [updateStopDto.longitude, updateStopDto.latitude],
      };
    }
    await this.stopRepository.update({ id_stop: id }, updateData);
    return this.findOneStop(id);
  }

  async desactivateStop(id: number): Promise<Stop> {
    const stop = await this.stopRepository.findOneBy({ id_stop: id });
    if (!stop) {
      throw new NotFoundException(`The stop with ID ${id} does not exist`);
    }
    stop.stop_state = 'INACTIVE';
    return this.stopRepository.save(stop);
  }
}
