import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TravelDetailService } from './travel_detail.service';
import { CreateTravelDetailDto } from './dto/create-travel_detail.dto';
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelDetailService.removeDetail(+id);
  }
}
