import { IsNumber, IsString } from 'class-validator';

export class CreateNftDto {
  @IsString()
  public address: string;
}
