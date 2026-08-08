import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePassengerDto {
  @IsString({ message: 'Passenger full name must be text' })
  @IsNotEmpty({ message: 'Passenger full name is obligatory' })
  full_name: string;

  @IsInt({ message: 'Passenger CI must be an integer' })
  @IsNotEmpty({ message: 'Passenger CI is obligatory' })
  ci: number;

  @IsInt({ message: 'Passenger age must be an integer' })
  @Min(0, { message: 'Passenger age must be positive' })
  @IsNotEmpty({ message: 'Passenger age is obligatory' })
  age: number;
}
