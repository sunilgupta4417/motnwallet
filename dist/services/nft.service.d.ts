import NftWeb3Service from './nft.web3.service';
import { CreateNftDto } from '../dtos/nft.dto';
declare class NftService {
    web3Service: NftWeb3Service;
    getAccountBalance(account: CreateNftDto): Promise<any>;
}
export default NftService;
