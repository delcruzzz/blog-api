import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsPhoneNumber,
  IsPositive,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(45)
  lastname: string;

  @IsString()
  @IsPhoneNumber('CO')
  @MaxLength(11)
  phone: string;

  @IsString()
  @MinLength(5)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @IsInt()
  @IsPositive()
  @IsIn([1, 2])
  status: number;

  @IsInt({ each: true })
  @Type(() => Number)
  @IsArray()
  rolesIds: number[];
}
