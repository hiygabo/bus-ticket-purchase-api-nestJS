import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelDetail } from './entities/travel_detail.entity';
import { CreateTravelDetailDto } from './dto/create-travel_detail.dto';
@Injectable()
export class TravelDetailService {
  constructor(
    @InjectRepository(TravelDetail)
    private readonly travelDetailRepository: Repository<TravelDetail>,
  ) {}

  async createDetail(
    createTravelDetailDto: CreateTravelDetailDto,
  ): Promise<TravelDetail> {
    const existingTicket = await this.travelDetailRepository.findOne({
      where: {
        travel: { id_travel: createTravelDetailDto.id_travel },
        seat: { id_seat: createTravelDetailDto.id_seat },
      },
    });

    if (existingTicket) {
      throw new BadRequestException(
        `El asiento ${createTravelDetailDto.id_seat} ya está ocupado para el viaje ${createTravelDetailDto.id_travel}`,
      );
    }
    const newDetail = this.travelDetailRepository.create({
      ticket_price: createTravelDetailDto.ticket_price,
      travel: { id_travel: createTravelDetailDto.id_travel },
      seat: { id_seat: createTravelDetailDto.id_seat },
      passenger: { id_passenger: createTravelDetailDto.id_passenger },
    });
    return await this.travelDetailRepository.save(newDetail);
  }

  async findAllDetails(): Promise<TravelDetail[]> {
    return await this.travelDetailRepository.find({
      relations: {
        travel: true,
        seat: true,
        passenger: true,
      },
    });
  }

  async findOneDetail(id_detail: number): Promise<TravelDetail> {
    const detail = await this.travelDetailRepository.findOne({
      where: { id_detail },
      relations: {
        travel: true,
        seat: true,
        passenger: true,
      },
    });

    if (!detail) {
      throw new NotFoundException(
        `Travel Detail con ID ${id_detail} no encontrado`,
      );
    }

    return detail;
  }

  async removeDetail(id_detail: number): Promise<void> {
    const detail = await this.findOneDetail(id_detail);
    await this.travelDetailRepository.remove(detail);
  }
}
