import { IsString, Matches, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'departure_time must have the correct format',
  })
  departure_time: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'estimated_arrival_time must have the correct format',
  })
  estimated_arrival_time?: string;
  @IsOptional()
  @IsOptional()
  estimated_travel_time?: string;
}
