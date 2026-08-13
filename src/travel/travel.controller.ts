import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelService.create(createTravelDto);
  }

  @Patch(':id')
  updateTravel(
    @Param('id') id: string,
    @Body() updateTravelDto: UpdateTravelDto,
  ) {
    return this.travelService.updateTravel(+id, updateTravelDto);
  }

  @Get()
  findAll() {
    return this.travelService.findAllTravels();
  }

  @Get('search')
  searchByRoute(
    @Query('origin') origin: string,
    @Query('destiny') destiny: string,
  ) {
    return this.travelService.searchByRoute(+origin, +destiny);
  }

  @Get(':id/seats')
  getSeatStatus(@Param('id') id: string) {
    return this.travelService.getTravelSeats(+id);
  }
}
