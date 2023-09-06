import { Post, HttpCode, JsonController, Body, UseBefore} from 'routing-controllers';
import NftService from '@services/nft.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { CreateNftDto } from '@/dtos/nft.dto';

@JsonController('/nft')
export class NftController {
  public nftService = new NftService();

  @Post('/')
  @OpenAPI({
    summary: 'Returns an overview of held NFT and its balances for the authorized user.',
  })
  @UseBefore(validationMiddleware(CreateNftDto, 'body'))
  @HttpCode(201)
  public async getNftOverview(@Body() data: CreateNftDto) {
    const nftData = await this.nftService.getAccountBalance(data);
    return { data: nftData, message: 'NFT Overview' };
  }
}
