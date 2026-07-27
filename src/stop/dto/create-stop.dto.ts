import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateStopDto {
  @IsString()
  @IsNotEmpty({ message: 'Stop name is obligatory' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'latitude is obligatory' })
  latitude: number;

  @IsNumber()
  @IsNotEmpty({ message: 'longitude is obligatory' })
  longitude: number;

  @IsInt()
  @IsNotEmpty({ message: 'Place ID is obligatory' })
  placeId: number;
}
