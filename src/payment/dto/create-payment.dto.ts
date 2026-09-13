import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional() 
  transaction_code?: string;

  @IsNumber()
  @IsNotEmpty()
  id_payment_type: number;

  @IsNumber()
  @IsNotEmpty()
  id_travel_detail: number;
}