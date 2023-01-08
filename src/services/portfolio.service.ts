import { HttpException } from '@exceptions/HttpException';
import Web3Service from '@services/web3.service';
import * as Constants from '../shared/constants';
import { CreatePortfolioDto } from '@/dtos/portfolio.dto';

class PortfolioService {
  public web3Service = new Web3Service();
  public async getAccountBalance(account: CreatePortfolioDto): Promise<any> {
    try {
      const accountBalance = await this.web3Service.getBalance(account.address);
      if (accountBalance != undefined || accountBalance != null) {
        return accountBalance;
      } else {
        throw new HttpException(500, `unable to fetch balance.`);
      }
    } catch (e) {
      throw new HttpException(400, Constants.errorMsg.somethingWentWrong);
    }
  }

  public async getAllocatedToken(account: CreatePortfolioDto): Promise<any> {
    try {
      const accountBalance = await this.web3Service.getAllocatedAmount(account.address);
      if (accountBalance != undefined || accountBalance != null) {
        return accountBalance;
      } else {
        throw new HttpException(500, `unable to fetch balance.`);
      }
    } catch (e) {
      throw new HttpException(400, Constants.errorMsg.somethingWentWrong);
    }
  }
}


export default PortfolioService;
