import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
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
    const passenger = this.passengerRepository.create(createPassengerDto);
    return this.passengerRepository.save(passenger);
  }

  findAll() {
    return `This action returns all passenger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passenger`;
  }

  update(id: number, updatePassengerDto: UpdatePassengerDto) {
    void updatePassengerDto;
    return `This action updates a #${id} passenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} passenger`;
  }
}
