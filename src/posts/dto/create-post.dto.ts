import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  cover?: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsInt()
  @IsPositive()
  @IsIn([1, 2])
  status: number;

  @IsInt()
  @IsPositive()
  userId: number;
}
