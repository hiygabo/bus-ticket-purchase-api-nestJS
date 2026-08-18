import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Passenger } from './entities/passenger.entity';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
  ) {}

  create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    return this.createPassenger(createPassengerDto);
  }

  async createPassenger(
    createPassengerDto: CreatePassengerDto,
  ): Promise<Passenger> {
    const existingPassenger = await this.passengerRepository.findOne({
      where: { ci: createPassengerDto.ci },
    });
    if (existingPassenger) {
      return existingPassenger;
    }

    const newPassenger = this.passengerRepository.create(createPassengerDto);
    return await this.passengerRepository.save(newPassenger);
  }

  async findOnePassenger(id: number): Promise<Passenger | null> {
    return this.passengerRepository.findOne({
      where: { id_passenger: id },
    });
  }
}
