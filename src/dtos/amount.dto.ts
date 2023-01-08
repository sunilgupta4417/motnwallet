import { IsNumber } from 'class-validator';

export class CreateAmountDto {
  @IsNumber()
  public amount: number;
}
