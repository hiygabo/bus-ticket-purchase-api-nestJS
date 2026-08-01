import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlaceDto {
  @IsString({ message: 'Place name must be text' })
  @IsNotEmpty({ message: 'Place name is obligatory' })
  place_name: string;
}
