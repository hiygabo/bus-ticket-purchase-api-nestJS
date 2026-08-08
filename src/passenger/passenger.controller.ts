import {
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { Passenger } from './entities/passenger.entity';

interface PassengerServiceContract {
  create(createPassengerDto: CreatePassengerDto): Promise<Passenger>;
  findAll(): string;
  findOne(id: number): string;
  update(id: number, updatePassengerDto: UpdatePassengerDto): string;
  remove(id: number): string;
}

@Controller('passenger')
export class PassengerController {
  constructor(
    @Inject(PassengerService)
    private readonly passengerService: PassengerServiceContract,
  ) {}

  @Post()
  async create(
    @Body() createPassengerDto: CreatePassengerDto,
  ): Promise<Passenger> {
    return await this.passengerService.create(createPassengerDto);
  }

  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ) {
    return this.passengerService.update(+id, updatePassengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengerService.remove(+id);
  }
}
