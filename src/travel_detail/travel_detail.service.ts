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
    const ticket = await this.travelDetailRepository.findOne({
      where: { id_detail },
      relations: {
        passenger: true,
        seat: true,
        travel: {
          bus: true,
          schedule: true,
          travel_origin: { place: true },
          travel_destiny: { place: true },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException(
        `Travel detail with ID ${id_detail} not found`,
      );
    }

    const passengerName = ticket.passenger?.full_name ?? '-';
    const passengerCi =
      ticket.passenger?.ci !== undefined ? String(ticket.passenger.ci) : '-';
    const origin =
      ticket.travel?.travel_origin?.place?.place_name ??
      ticket.travel?.travel_origin?.stop_name ??
      '-';
    const destiny =
      ticket.travel?.travel_destiny?.place?.place_name ??
      ticket.travel?.travel_destiny?.stop_name ??
      '-';
    const departureDate = ticket.travel?.departure_date
      ? new Date(ticket.travel.departure_date).toLocaleDateString('es-BO')
      : '-';
    const departureTime = ticket.travel?.schedule?.departure_time ?? '-';
    const arrivalTime = ticket.travel?.schedule?.estimated_arrival_time ?? '-';
    const busPlate = ticket.travel?.bus?.bus_plate ?? '-';
    const seatNumber = ticket.seat?.seat_number ?? ticket.seat?.id_seat ?? '-';
    const totalPrice =
      ticket.travel?.price != null ? `Bs. ${ticket.travel.price}` : 'Bs. -';

    const doc = new PDFDocument({ margin: 45, size: 'A4' });

    const red = '#c8102e';
    const dark = '#1a1a2e';
    const gray = '#6b6b70';
    const lightGray = '#f4f4f5';
    const borderGray = '#e0e0e3';
    const white = '#ffffff';

    doc.rect(0, 0, doc.page.width, 95).fill(red);

    doc.fillColor(white).fontSize(24).font('Helvetica-Bold');
    doc.text('TRANS COPACABANA S.A.', 45, 22, { align: 'left' });

    doc.fontSize(10.5).font('Helvetica');
    doc.text('TRAVEL TICKET', 45, 58);
    doc.text('Av. de la Amistad Nº 123 · La Paz, Bolivia', 45, 74);

    doc.fontSize(11).font('Helvetica-Bold');
    doc.text(`Nº ${ticket.id_detail}`, doc.page.width - 45, 48, {
      align: 'right',
    });

    let y = 135;

    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(dark)
      .text('PASSENGER DATA', 45, y);
    y += 24;
    y = this.drawPair(
      doc,
      'Name',
      passengerName,
      y,
      45,
      borderGray,
      lightGray,
      dark,
      gray,
    );
    y = this.drawPair(
      doc,
      'CI',
      passengerCi,
      y,
      45,
      borderGray,
      lightGray,
      dark,
      gray,
    );

    y += 18;
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(dark)
      .text('TRAVEL DETAILS', 45, y);
    y += 24;

    y = this.drawPair(
      doc,
      'Route',
      `${origin} → ${destiny}`,
      y,
      45,
      borderGray,
      lightGray,
      dark,
      gray,
    );
    y = this.drawPair(
      doc,
      'Date',
      departureDate,
      y,
      45,
      borderGray,
      lightGray,
      dark,
      gray,
    );
    y = this.drawPair(
      doc,
      'Departure',
      departureTime,
      y,
      45,
      borderGray,
      lightGray,
      dark,
      gray,
    );
    y = this.drawPair(
      doc,
      'Arrival',
      arrivalTime,
      y,
      45,
      borderGray,
      lightGray,
      dark,
      gray,
    );

    y += 18;
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor(dark)
      .text('BUS & SEAT', 45, y);
    y += 24;

    y = this.drawPair(
      doc,
      'Bus plate',
      busPlate,
      y,
      45,
      borderGray,
      lightGray,
      dark,
      gray,
    );
    y = this.drawPair(
      doc,
      'Seat',
      String(seatNumber),
      y,
      45,
      borderGray,
      lightGray,
      dark,
      gray,
    );

    y += 28;
    const totalX = doc.page.width - 45 - 220;
    doc.rect(totalX, y, 220, 40).fill(red);
    doc.fillColor(white).font('Helvetica-Bold');
    doc.fontSize(12).text('TOTAL', totalX + 16, y + 12);
    doc.fontSize(16).text(totalPrice, totalX + 16, y + 8, {
      align: 'right',
      width: 220 - 32,
    });

    y += 90;

    doc
      .moveTo(45, y)
      .lineTo(doc.page.width - 45, y)
      .lineWidth(1)
      .stroke(borderGray);
    y += 22;
    doc.fillColor(gray).font('Helvetica').fontSize(9.5);
    doc.text(
      'Present this ticket printed or digital on your travel day.',
      45,
      y,
      { align: 'center' },
    );
    doc.text('Thank you for traveling with us!', 45, y + 16, {
      align: 'center',
    });

    return doc;
  }

  private drawPair(
    doc: PDFKit.PDFDocument,
    labelText: string,
    value: string,
    top: number,
    x: number,
    borderGray: string,
    lightGray: string,
    dark: string,
    gray: string,
  ): number {
    const h = 34;
    const labelW = 130;

    doc.save();
    doc.rect(x, top, labelW, h).fill(lightGray).stroke(borderGray);
    doc.fillColor(gray).font('Helvetica-Bold').fontSize(10);
    doc.text(labelText.toUpperCase(), x + 9, top + 10, { width: labelW - 18 });

    doc
      .rect(x + labelW, top, doc.page.width - x - labelW - 45, h)
      .fillColor('#ffffff')
      .stroke(borderGray);
    doc.fillColor(dark).font('Helvetica').fontSize(12);
    doc.text(value, x + labelW + 9, top + 9, {
      width: doc.page.width - x - labelW - 45 - 18,
    });

    doc.restore();
    return top + h;
  }
}
