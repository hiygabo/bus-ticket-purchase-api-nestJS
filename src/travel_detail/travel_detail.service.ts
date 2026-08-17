import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelDetail } from './entities/travel_detail.entity';
import { CreateTravelDetailDto } from './dto/create-travel_detail.dto';
import PDFDocument = require('pdfkit');
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
        `Seat ${createTravelDetailDto.id_seat} is already occupied for travel ${createTravelDetailDto.id_travel}`,
      );
    }
    const newDetail = this.travelDetailRepository.create({
      ticket_price: createTravelDetailDto.ticket_price,
      travel: { id_travel: createTravelDetailDto.id_travel },
      seat: { id_seat: createTravelDetailDto.id_seat },
      passenger: { id_passenger: createTravelDetailDto.id_passenger },
    });
    return this.travelDetailRepository.save(newDetail);
  }

  async findAllDetails(): Promise<TravelDetail[]> {
    return this.travelDetailRepository.find({
      relations: {
        travel: true,
        seat: true,
        passenger: true,
      },
    });
  }

  async findAllByTravel(id_travel: number): Promise<TravelDetail[]> {
    return this.travelDetailRepository.find({
      where: {
        travel: { id_travel: id_travel },
      },
      relations: {
        seat: true,
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
        `Travel detail with ID ${id_detail} not found`,
      );
    }

    return detail;
  }

  async removeDetail(id_detail: number): Promise<void> {
    const detail = await this.findOneDetail(id_detail);
    await this.travelDetailRepository.remove(detail);
  }

  async generateTicketPDF(id_detail: number): Promise<PDFKit.PDFDocument> {
    const ticket = await this.findOneDetail(id_detail);

    const doc = new PDFDocument({ margin: 50 });

    doc.fontSize(20).text('TRAVEL TICKET', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`TICKET Nro: ${ticket.id_detail}`);
    doc.text(`Precio: $${ticket.ticket_price}`);
    doc.moveDown();

    doc.fontSize(12).text(`PASSENGER NAME: ${ticket.passenger.full_name}`);
    doc.text(`TRAVEL ID: ${ticket.travel.id_travel}`);
    doc.text(`SEAT:: ${ticket.seat.id_seat}`);

    return doc;
  }
}
