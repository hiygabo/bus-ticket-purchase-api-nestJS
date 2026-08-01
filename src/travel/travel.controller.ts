import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelService.create(createTravelDto);
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
}
