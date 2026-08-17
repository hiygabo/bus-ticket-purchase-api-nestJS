import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TravelDetailService } from './travel_detail.service';
import { CreateTravelDetailDto } from './dto/create-travel_detail.dto';
import type { Response } from 'express';
@Controller('travel-detail')
export class TravelDetailController {
  constructor(private readonly travelDetailService: TravelDetailService) {}

  @Post()
  create(@Body() createTravelDetailDto: CreateTravelDetailDto) {
    return this.travelDetailService.createDetail(createTravelDetailDto);
  }

  @Get()
  findAll() {
    return this.travelDetailService.findAllDetails();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelDetailService.findOneDetail(+id);
  }

  @Get(':id/ticket')
  async downloadTicket(@Param('id') id: string, @Res() res: Response) {
    const doc = await this.travelDetailService.generateTicketPDF(+id);
    res.set({
      'Content-type': 'application/pdf',
      'Content-Disposition': `attachment; filename=Ticket-${id}.pdf`,
    });
    doc.pipe(res);
    doc.end();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelDetailService.removeDetail(+id);
  }

  @Get('occupied/:id_travel')
  async getOccupiedSeats(@Param('id_travel') id_travel: string) {
    const details = await this.travelDetailService.findAllByTravel(
      Number(id_travel),
    );
    return details.map((detail) => detail.seat.id_seat);
  }
}
