import NftService from '../services/nft.service';
import { CreateNftDto } from '../dtos/nft.dto';
export declare class NftController {
    nftService: NftService;
    getNftOverview(data: CreateNftDto): Promise<{
        data: any;
        message: string;
    }>;
}
