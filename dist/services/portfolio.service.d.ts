import Web3Service from './web3.service';
import { CreatePortfolioDto } from '../dtos/portfolio.dto';
declare class PortfolioService {
    web3Service: Web3Service;
    getAccountBalance(account: CreatePortfolioDto): Promise<any>;
    getAllocatedToken(account: CreatePortfolioDto): Promise<any>;
}
export default PortfolioService;
