import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
export class CreateBusDto {
  @IsString()
  @IsNotEmpty({ message: 'Bus plate cannot be empty' })
  bus_plate: string;

  @IsInt()
  @IsNotEmpty({ message: 'Category ID is obligatory' })
  categoryId: number;

  @IsString()
  @IsOptional()
  bus_state?: string;
}
