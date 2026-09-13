import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { PaymentType } from './entities/payment_type.entity';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepository: Repository<PaymentType>,
  ) {}

  async create(createPaymentTypeDto: CreatePaymentTypeDto): Promise<PaymentType> {
    const existingPaymentType = await this.paymentTypeRepository.findOne({
      where: { name: createPaymentTypeDto.name },
    });

    if (existingPaymentType) {
      throw new ConflictException('This payment type already exists');
    }

    const paymentType = this.paymentTypeRepository.create(createPaymentTypeDto);
    return this.paymentTypeRepository.save(paymentType);
  }

  async findAll(): Promise<PaymentType[]> {
    return this.paymentTypeRepository.find();
  }

  async findOne(id: number): Promise<PaymentType> {
    const paymentType = await this.paymentTypeRepository.findOne({
      where: { id_payment_type: id },
    });

    if (!paymentType) {
      throw new NotFoundException(`Payment type with ID ${id} not found`);
    }

    return paymentType;
  }

  async update(
    id: number,
    updatePaymentTypeDto: UpdatePaymentTypeDto,
  ): Promise<PaymentType> {
    const paymentType = await this.findOne(id);

    if (updatePaymentTypeDto.name) {
      const existingPaymentType = await this.paymentTypeRepository.findOne({
        where: { name: updatePaymentTypeDto.name },
      });

      if (existingPaymentType && existingPaymentType.id_payment_type !== id) {
        throw new ConflictException('This payment type already exists');
      }
    }

    Object.assign(paymentType, updatePaymentTypeDto);
    return this.paymentTypeRepository.save(paymentType);
  }

  async remove(id: number): Promise<void> {
    const paymentType = await this.findOne(id);
    await this.paymentTypeRepository.remove(paymentType);
  }
}
