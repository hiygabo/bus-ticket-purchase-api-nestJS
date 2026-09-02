import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Must be a valid email' })
  @IsNotEmpty()
  email?: string;

  @IsString()
  @MinLength(6, { message: 'Password must have almost 6 characters ' })
  password?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsNotEmpty()
  @IsNumber()
  id_place?: number;
}
