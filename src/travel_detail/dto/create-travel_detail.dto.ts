import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

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
  @IsInt()
  id_passenger: number;
}
