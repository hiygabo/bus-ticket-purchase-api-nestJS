import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createBusDto: CreateBusDto) {
    return this.busService.createBus(createBusDto);
  }

  @Get()
  findAll() {
    return this.busService.findAllBuses();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busService.findOneBus(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busService.update(+id, updateBusDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.desactivateBus(+id);
  }
}
