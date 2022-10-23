import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsNumber()
  @IsNotEmpty()
  index: number;
}
