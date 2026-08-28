import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelService.create(createTravelDto);
  }

  @UseGuards(AuthGuard('jwt'))
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

  @Get('active')
  findAllActive() {
    return this.travelService.findAllActiveTravels();
  }

  @Get(':id/seats')
  getSeatStatus(@Param('id') id: string) {
    return this.travelService.getTravelSeats(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  desactivate(@Param('id') id: string) {
    return this.travelService.deactivateTravel(+id);
  }
}
