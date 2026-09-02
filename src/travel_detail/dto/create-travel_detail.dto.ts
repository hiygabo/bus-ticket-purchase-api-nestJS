import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateTravelDetailDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  ticket_price: number;

  @IsNotEmpty()
  @IsInt()
  id_travel: number;

  @IsNotEmpty()
  @IsInt()
  id_seat: number;

  @IsNotEmpty()
  @IsString()
  passenger_full_name: string;

  @IsNotEmpty()
  @IsString()
  passenger_ci: string;
  
  @IsNotEmpty()
  @IsInt()
  id_user: number;
}
