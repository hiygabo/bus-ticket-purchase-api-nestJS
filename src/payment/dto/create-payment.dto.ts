import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'completed', 'failed', 'cancelled'])
  status?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  transaction_code?: string;

  @IsNumber()
  @IsNotEmpty()
  id_payment_type: number;

  @IsNumber()
  @IsNotEmpty()
  id_travel_detail: number;
}