import {
  IsIn,
  IsInt,
  IsPositive,
  IsString,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsUppercase()
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(4)
  @IsUppercase()
  abbreviation: string;

  @IsInt()
  @IsPositive()
  @IsIn([1, 2])
  status: number;
}
