import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelDetailDto } from './create-travel_detail.dto';

export class UpdateTravelDetailDto extends PartialType(CreateTravelDetailDto) {}
