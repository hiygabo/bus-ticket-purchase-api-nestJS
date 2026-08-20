import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';
import { Seat } from '../seat/entities/seat.entity';
import { TravelDetail } from '../travel_detail/entities/travel_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private travelRepository: Repository<Travel>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(TravelDetail)
    private travelDetailRepository: Repository<TravelDetail>,
  ) {}

  async create(createTravelDto: CreateTravelDto) {
    const newTravel = this.travelRepository.create({
      departure_date: createTravelDto.departure_date,
      route: createTravelDto.route as string,
      bus: { id_bus: createTravelDto.id_bus },
      travel_origin: { id_stop: createTravelDto.id_origin_stop },
      travel_destiny: { id_stop: createTravelDto.id_destiny_stop },
      schedule: { id_schedule: createTravelDto.id_schedule },
    });

    return this.travelRepository.save(newTravel);
  }

  async updateTravel(id: number, updateTravelDto: UpdateTravelDto) {
    const travel = await this.travelRepository.findOne({
      where: { id_travel: id },
    });

    if (!travel) {
      throw new NotFoundException(`Travel with ID ${id} not found`);
    }

    travel.route = updateTravelDto.route as string;

    return this.travelRepository.save(travel);
  }

  async findAllTravels() {
    return this.travelRepository.find({
      relations: {
        bus: {
          seats: true,
        },
        travel_origin: {
          place: true,
        },
        travel_destiny: {
          place: true,
        },
        schedule: true,
      },
    });
  }

  async searchByRoute(idOrigin: number, idDestiny: number) {
    return this.travelRepository.find({
      where: {
        travel_origin: { id_stop: idOrigin },
        travel_destiny: { id_stop: idDestiny },
      },
      relations: {
        bus: true,
        travel_origin: true,
        travel_destiny: true,
        schedule: true,
      },
    });
  }

  async getTravelSeats(id_travel: number) {
    const travel = await this.travelRepository.findOne({
      where: { id_travel },
      relations: { bus: true },
    });

    if (!travel) {
      throw new NotFoundException(`Travel with ID ${id_travel} not found`);
    }

    const allSeats = await this.seatRepository.find({
      where: { bus: { id_bus: travel.bus.id_bus } },
      order: { seat_number: 'ASC' },
    });

    const solidTickets = await this.travelDetailRepository.find({
      where: { travel: { id_travel: id_travel } },
      relations: { seat: true },
    });

    const occupiedSeatIds = solidTickets.map((ticket) => ticket.seat.id_seat);

    const seatMap = allSeats.map((seat) => ({
      id_seat: seat.id_seat,
      seat_number: seat.seat_number,
      status: occupiedSeatIds.includes(seat.id_seat) ? 'OCCUPIED' : 'FREE',
    }));

    return seatMap;
  }

  async deactivateTravel(id_travel: number) {
    const travel = await this.travelRepository.findOne({
      where: { id_travel: id_travel },
    });

    if (!travel) {
      throw new NotFoundException(`Travel with ID ${id_travel} not found`);
    }
    travel.status = 'INACTIVE';

    return this.travelRepository.save(travel);
  }
}
