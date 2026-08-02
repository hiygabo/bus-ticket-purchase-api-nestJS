import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateSeatDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Seat number is obligatory' })
  seat_number: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Bus ID number is obligatory' })
  busId: number;
}
