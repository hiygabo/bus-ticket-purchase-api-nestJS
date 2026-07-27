import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  async createBus(createBusDto: CreateBusDto): Promise<Bus> {
    const bus = this.busRepository.create(createBusDto);
    return await this.busRepository.save(bus);
  }

  async findAllBuses(): Promise<Bus[]> {
    return await this.busRepository.find({
      relations: { category: true },
    });
  }

  async findOneBus(id: number): Promise<Bus> {
    const bus = await this.busRepository.findOne({
      where: { id_bus: id },
      relations: { category: true },
    });
    if (!bus) throw new NotFoundException(`bus with ID ${id} not found`);
    return bus;
  }

  async update(id: number, updateBusDto: UpdateBusDto): Promise<Bus> {
    await this.busRepository.update(id, updateBusDto);
    return this.findOneBus(id);
  }
  async desactivateBus(id: number): Promise<Bus> {
    const bus = await this.busRepository.findOneBy({ id_bus: id });

    if (!bus) {
      throw new NotFoundException(`The bus with ID ${id} doesnt exists`);
    }

    bus.bus_state = 'INACTIVE';
    return await this.busRepository.save(bus);
  }
}
