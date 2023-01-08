import { Post, HttpCode, JsonController, Body, UseBefore} from 'routing-controllers';
import PortfolioService from '@services/portfolio.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { CreatePortfolioDto } from '@/dtos/portfolio.dto';

@JsonController('/portfolio')
export class PortfolioController {
  public portfolioService = new PortfolioService();

  @Post('/')
  @OpenAPI({
    summary: 'Returns an overview of held tokens and its balances for the authorized user.',
  })
  @UseBefore(validationMiddleware(CreatePortfolioDto, 'body'))
  @HttpCode(201)
  public async getPortfolioOverview(@Body() data: CreatePortfolioDto) {
    const userTokenList = await this.portfolioService.getAccountBalance(data);
    return { data: userTokenList, message: 'Portfolio Overview' };
  }

  @Post('/allocation')
  @OpenAPI({
    summary: 'Returns an overview of held Allocated tokens  for the authorized user.',
  })
  @UseBefore(validationMiddleware(CreatePortfolioDto, 'body'))
  @HttpCode(201)
  public async getAllocatedTokenOverview(@Body() data: CreatePortfolioDto) {
    const userTokenList = await this.portfolioService.getAllocatedToken(data);
    return { data: userTokenList, message: 'Portfolio Overview' };
  }
}
