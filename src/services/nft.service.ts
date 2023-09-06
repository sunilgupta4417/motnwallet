import { HttpException } from '@exceptions/HttpException';
import NftWeb3Service from '@services/nft.web3.service';
import * as Constants from '../shared/constants';
import { CreateNftDto } from '@/dtos/nft.dto';

class NftService {
  public web3Service = new NftWeb3Service();
  public async getAccountBalance(account: CreateNftDto): Promise<any> {
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
}


export default NftService;
