import { IsNumber, IsString } from 'class-validator';

export class CreateAllocateDto {
  @IsString()
  public toAddress: string;

  @IsNumber()
  public amount: number;
}
