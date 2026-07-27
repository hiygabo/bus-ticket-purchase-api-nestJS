import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateBusDto {
  @IsString()
  @IsNotEmpty({ message: 'Bus plate cannot be empty' })
  bus_plate: string;

  @IsInt()
  @IsNotEmpty({ message: 'Category ID is obligatory' })
  categoryId: number;
}
