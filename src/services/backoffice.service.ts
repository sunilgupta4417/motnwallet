import { HttpException } from '@exceptions/HttpException';
import Web3Service from '@services/web3.service';
import * as Constants from '../shared/constants';
import { CreateAllocateDto } from '@/dtos/allocate.dto';
import { CreateAmountDto } from '@/dtos/amount.dto';

class BackofficeService {
  public web3Service = new Web3Service();
  /**
   *
   * @param toAddress
   * @param amount
   */

  public async allocate(data: CreateAllocateDto): Promise<any> {
    if (data.toAddress != undefined) {
      const accountBalance = await this.web3Service.allocate(data.toAddress, data.amount);
      console.log('>>>>accountBalance', accountBalance);
      
      return accountBalance;
    } else {
      throw new HttpException(500, Constants.errorMsg.depositIssue);
    }
  }

  public async approve(data: CreateAmountDto): Promise<any> {
    if (data.amount != undefined) {
      const accountBalance = await this.web3Service.approve(data.amount);
      return accountBalance;
    } else {
      throw new HttpException(500, Constants.errorMsg.depositIssue);
    }
  }
}

export default BackofficeService;
