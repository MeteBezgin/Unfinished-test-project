import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTextDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsNumber()
  @IsNotEmpty()
  index: number;

  @IsString()
  @IsNotEmpty()
  body: string;
}
