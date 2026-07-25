import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelDetailService } from './travel_detail.service';
import { CreateTravelDetailDto } from './dto/create-travel_detail.dto';
import { UpdateTravelDetailDto } from './dto/update-travel_detail.dto';

@Controller('travel-detail')
export class TravelDetailController {
  constructor(private readonly travelDetailService: TravelDetailService) {}

  @Post()
  create(@Body() createTravelDetailDto: CreateTravelDetailDto) {
    return this.travelDetailService.create(createTravelDetailDto);
  }

  @Get()
  findAll() {
    return this.travelDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelDetailDto: UpdateTravelDetailDto) {
    return this.travelDetailService.update(+id, updateTravelDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelDetailService.remove(+id);
  }
}
