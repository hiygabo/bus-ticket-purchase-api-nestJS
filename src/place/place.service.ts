import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placeRepository.create(createPlaceDto);
    return this.placeRepository.save(place);
  }

  async findAllPlaces(): Promise<Place[]> {
    return this.placeRepository.find();
  }

  async findeOnePlace(id: number): Promise<Place> {
    const place = await this.placeRepository.findOne({
      where: { id_place: id },
    });

    if (!place) {
      throw new NotFoundException(`The place with ID ${id} not found`);
    }

    return place;
  }

  async disablePlace(id: number): Promise<Place> {
    const place = await this.placeRepository.findOneBy({ id_place: id });
    if (!place) {
      throw new NotFoundException(`Place with ID ${id} does not exist`);
    }
    place.place_state = 'INACTIVE';
    return place;
  }
}
