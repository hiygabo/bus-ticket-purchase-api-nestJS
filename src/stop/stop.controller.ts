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
import { StopService } from './stop.service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('stop')
export class StopController {
  constructor(private readonly stopService: StopService) {}

  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStopDto: UpdateStopDto) {
    return this.stopService.updateStop(+id, updateStopDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stopService.desactivateStop(+id);
  }
}
