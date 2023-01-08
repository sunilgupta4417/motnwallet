import { IsNumber, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  public address: string;
}
