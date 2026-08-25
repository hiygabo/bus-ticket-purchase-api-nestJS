import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTravelDto {
  @IsDateString({}, { message: 'departure_date must be a valid date' })
  departure_date: string;

  @IsNumber({}, { message: 'price must be a number' })
  @IsOptional()
  price: number;

  @IsString({ message: 'status must be a string' })
  @IsOptional()
  status: string;

  @IsInt({ message: 'id_bus must be a number' })
  id_bus: number;

  @IsInt({ message: 'id_origin_stop must be a number' })
  id_origin_stop: number;

  @IsInt({ message: 'id_destiny_stop must be a number' })
  id_destiny_stop: number;

  @IsInt({ message: 'id_schedule must be a number' })
  id_schedule: number;

  @IsNotEmpty({ message: 'The route (GeoJSON) is obligatory' })
  route: any;
}
