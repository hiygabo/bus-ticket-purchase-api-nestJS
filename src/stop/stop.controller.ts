import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StopService } from './stop.service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';

@Controller('stop')
export class StopController {
  constructor(private readonly stopService: StopService) {}

  @Post()
  create(@Body() createStopDto: CreateStopDto) {
    return this.stopService.createStop(createStopDto);
  }

  @Get()
  findAll() {
    return this.stopService.findAllStops();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stopService.findOneStop(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStopDto: UpdateStopDto) {
    return this.stopService.updateStop(+id, updateStopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stopService.desactivateStop(+id);
  }
}
