import Web3Service from './web3.service';
import { CreateAllocateDto } from '../dtos/allocate.dto';
import { CreateAmountDto } from '../dtos/amount.dto';
declare class BackofficeService {
    web3Service: Web3Service;
    /**
     *
     * @param toAddress
     * @param amount
     */
    allocate(data: CreateAllocateDto): Promise<any>;
    approve(data: CreateAmountDto): Promise<any>;
}
export default BackofficeService;
