import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}
  async createSeat(createSeatDto: CreateSeatDto): Promise<Seat> {
    const newSeat = this.seatRepository.create({
      seat_number: createSeatDto.seat_number,
      bus: { id_bus: createSeatDto.busId },
    });
    return await this.seatRepository.save(newSeat);
  }

  async findAllSeats(): Promise<Seat[]> {
    return await this.seatRepository.find({
      relations: { bus: true },
    });
  }
}
